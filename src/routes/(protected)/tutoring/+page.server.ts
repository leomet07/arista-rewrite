import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import {
	TutoringRequestSchema,
	type RecievedTutoringRequest,
	type RecievedTutoringSession,
	type ExpandedTutoringSession,
	type RecievedPublicUserData,
	TutoringSessionSchema
} from "$lib/db_types";
import handleError from "$lib/handleError";
import { z } from "zod";
import { zod } from 'sveltekit-superforms/adapters';

let RequestTutoringSchema = TutoringRequestSchema.omit({ tutee: true }); // don't include tutee in form;
let FinishTutoringSessionSchema = z.object({
	durationInHours: z.string().refine(v => { let n = Number(v); return !isNaN(n) && v?.length > 0; }, { message: "Invalid number. Please enter something similar to: 1, 2, 3, etc." })
});

export const load = async ({ locals, request }) => {
	// Server API:
	const requestTutoringForm = await superValidate(zod(RequestTutoringSchema));
	const finishTutoringSessionForm = await superValidate(zod(FinishTutoringSessionSchema));

	if (!locals?.user?.id) {
		error(401, "User not logged in.");
	}

	const requests = structuredClone(
		(await locals.pb
			.collection("tutoringRequests")
			.getFullList({ sort: "-created", filter: "isClaimed=false", requestKey: null })) as unknown
	) as RecievedTutoringRequest[];

	const sessions = structuredClone(
		(await locals.pb
			.collection("tutoringSessions")
			.getFullList({ sort: "-created", expand: "tutoringRequest", filter: "isComplete=false && isCancelled=false", requestKey: null })) as unknown
	) as ExpandedTutoringSession[];

	// only gets rows where tutor or tutee is matching an active session for this user
	// use a viewCollection as to not leak ALL user's names
	const names = (await locals.pb.collection("publicUsers").getFullList()) as unknown as RecievedPublicUserData[];

	const expanded_sessions: ExpandedTutoringSession[] = sessions.map((session) => {
		const tutor_name = names.find((j) => j.id === session.tutor)?.name;
		const tutor_email = names.find((j) => j.id === session.tutor)?.email;
		const tutee_name = names.find((j) => j.id === session.tutee)?.name;
		const tutee_email = names.find((j) => j.id === session.tutee)?.email;

		return { ...session, tutor_name, tutee_name, tutor_email, tutee_email };
	});

	return { requestTutoringForm, finishTutoringSessionForm, tutoringRequests: requests, tutoringSessions: expanded_sessions }; // Unless you throw, always return { form } in load and form actions.
};

export const actions: Actions = {
	request_tutoring: async ({ locals, request }) => {
		const requestTutoringForm = await superValidate(request, zod(RequestTutoringSchema));

		if (!locals?.user?.id) {
			error(401, "User not logged in.");
		}

		if (!locals?.user?.is_tutee) {
			error(401, "User is not a tutee.");
		}
		if (!requestTutoringForm.valid) {
			return fail(400, { requestTutoringForm });
		}

		try {
			await locals.pb
				.collection("tutoringRequests")
				.create({ ...requestTutoringForm.data, tutee: locals.user.id });
		} catch (error: unknown) {
			console.error(error);
			return handleError(error, requestTutoringForm);
		}

		return { requestTutoringForm };
	},
	claim_tutoring_request: async ({ locals, request, params, url }) => {
		console.log(request, params, url);
		if (!locals?.user?.id) {
			error(401, "User not logged in.");
		}

		if (locals?.user?.is_tutee) {
			error(401, "A tutee cannot claim a request.");
		}

		const tutoring_request_id = url.searchParams.get("id");
		if (!tutoring_request_id) {
			error(400, "A tutoring request ID must be passed in as a parameter to claim it.");
		}

		try {
			// get the tutoring request
			const tutoringRequest = structuredClone(
				(await locals.pb.collection("tutoringRequests").getOne(tutoring_request_id)) as unknown
			) as RecievedTutoringRequest;

			// create the tutoringSession
			await locals.pb.collection("tutoringSessions").create({
				tutee: tutoringRequest.tutee,
				tutor: locals.user.id,
				tutoringRequest: tutoring_request_id,
				isComplete: false
			});

			// update the tutoring request
			await locals.pb
				.collection("tutoringRequests")
				.update(tutoring_request_id, { isClaimed: true });
		} catch (error: unknown) {
			console.error(error);
		}
	},
	finish_tutoring_session: async ({ locals, request, params, url }) => {
		if (!locals?.user?.id) {
			error(401, "User not logged in.");
		}

		if (!locals?.user?.is_tutee) {
			error(401, "A non-tutee cannot finish a request.");
		}

		const finishTutoringForm = await superValidate(request, zod(FinishTutoringSessionSchema));

		if (!finishTutoringForm.valid) {
			return fail(400, { finishTutoringForm });
		}

		console.log("Tutoring form is valid: ", finishTutoringForm.data);

		const tutoring_session_id = url.searchParams.get("id");
		if (!tutoring_session_id) {
			error(400, "A tutoring session ID must be passed in as a parameter to finish it.");
		}

		try {
			// get the tutoring request
			const tutoringSession = structuredClone(
				(await locals.pb.collection("tutoringSessions").getOne(tutoring_session_id)) as unknown
			) as RecievedTutoringSession;

			const durationInHours = Number(finishTutoringForm.data.durationInHours);
			if (Number.isNaN(durationInHours)) {
				error(400, "Duration in hours of a tutoring session cannot be NaN");
			}
			if (durationInHours > 10 || durationInHours <= 0) {
				// checking range here because using the pocketbase schema above is weird
				error(400, "Duration in hours of a tutoring session cannot be <= 0 or > 10");
			}

			await locals.pb.collection("tutoringSessions").update(tutoring_session_id, { isComplete: true, dateCompleted: new Date().toISOString(), durationInHours: finishTutoringForm.data.durationInHours });
		} catch (error: unknown) {
			console.error(error);
		}
		return { finishTutoringForm };
	},
	cancel_tutoring_session: async ({ locals, request, params, url }) => {
		if (!locals?.user?.id) {
			error(401, "User not logged in.");
		}
	
	//check; isCancelled to cancel 
	const tutoring_session_id = url.searchParams.get("id") as string;
	const session = await locals.pb.collection("tutoringSessions").getOne(tutoring_session_id) as RecievedTutoringSession;

	if (session.tutee !== locals.user.id && session.tutor !== locals.user.id) {
		error(403, "You don't have permission to cancel this session.");
	}
	await locals.pb.collection("tutoringSessions").update(tutoring_session_id, {
		isCancelled: true
	});
	await locals.pb.collection("tutoringRequests").update(session.tutoringRequest, {
		isClaimed: false //return to pool
	});
}
};
