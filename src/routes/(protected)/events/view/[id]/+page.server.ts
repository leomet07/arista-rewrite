import { error } from "@sveltejs/kit";
import { EventSchema, type ExpandedEvent, type RecievedCredit, type RecievedEvent, type RecievedUser } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";
import { isOnCommittee } from "$lib/isOnCommittee";
import { determinteEventCredits } from "$lib/determinteCredits";
import mergeUsersWithEmails from "$lib/mergeUsersWithEmails";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import handleError from "$lib/handleError";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
	const event_id = params.id;

	const event = await locals.pb.collection("events").getOne(event_id, { requestKey: null, expand: "signed_up" });
	if (event?.expand?.signed_up) {
		event.expand.signed_up = await mergeUsersWithEmails(event.expand.signed_up, locals.pb);
	}

	const serialized_event = structuredClone(event as unknown) as ExpandedEvent;
	const serialized_event_with_time = {
		...serialized_event,
		start_time: new Date(serialized_event.start_time),
		end_time: new Date(serialized_event.end_time)
	};

	let is_current_user_signed_up = serialized_event_with_time.signed_up.includes(locals?.user?.id);

	// this will only return something for event committee members 
	const filterstr = `event="${event_id}"`;
	const credited_users = await locals.pb.collection("credits").getFullList({ filter: filterstr }) as RecievedCredit[];
	const credited_user_ids = credited_users.map(v => v.user);

	// Server API:
	const update_form = await superValidate(serialized_event_with_time, zod(EventSchema));

	return {
		event: serialized_event_with_time,
		is_current_user_signed_up,
		credited_user_ids,
		update_form: update_form
	};
}) satisfies PageServerLoad;

export const actions = {
	event_sign_up: async ({ request, locals, params }) => {
		const event_id = params.id;

		if (!locals.user) {
			error(401, "User not logged in.");
		}

		const event = await locals.pb.collection("events").getOne(event_id);

		const serialized_event = structuredClone(event as unknown) as RecievedEvent;

		if (serialized_event.isComplete) {
			error(401, "Can't sign up for an already completed event.");
		}

		await locals.pb.collection<RecievedEvent>("events").update(event_id, {
			signed_up: [...serialized_event.signed_up, locals.user.id]
		});
	},
	event_unsign_up: async ({ request, locals, params }) => {
		const event_id = params.id;

		if (!locals.user) {
			error(401, "User not logged in.");
		}

		const event = await locals.pb.collection("events").getOne(event_id);

		const serialized_event = structuredClone(event as unknown) as RecievedEvent;

		if (serialized_event.isComplete) {
			error(401, "Can't unsign up from an already completed event.");
		}

		await locals.pb.collection<RecievedEvent>("events").update(event_id, {
			signed_up: serialized_event.signed_up.filter((sid) => sid != locals?.user?.id)
		});
	},
	giveCreditToUser: async ({ request, locals, params }) => {
		if (!locals.user) {
			error(401, "User not logged in.");
		}

		if (!isOnCommittee(locals.user as RecievedUser, "events")) {
			error(401, "User is not a member of the events committee.");
		}

		const json = (await request.json());
		const user_id = json.user_id;
		const credits = json.credits;

		const event_id = params.id;

		const created_credits = await locals.pb.collection("credits").create(
			{
				credits: credits,
				user_id: user_id,
				event: event_id,
				user: user_id
			},
			{ requestKey: null } // requestKey is null here to avoid cancelled requests when successive requests are ran
		);
		console.log("created_credits: ", created_credits);
	},
	mark_event_as_completed: async ({ request, locals, params }) => {
		const event_id = params.id;

		if (!locals.user) {
			error(401, "User not logged in.");
		}

		if (!isOnCommittee(locals.user as RecievedUser, "events")) {
			error(401, "User is not a member of the events committee.");
		}

		await locals.pb.collection<RecievedEvent>("events").update(
			event_id,
			{
				isComplete: true
			},
			{ requestKey: null }
		);
	},
	update_event: async ({ request, locals, params }) => {
		const event_id = params.id;

		if (!locals.user) {
			error(401, "User not logged in.");
		}

		if (!isOnCommittee(locals.user as RecievedUser, "events")) {
			error(401, "User is not a member of the events committee.");
		}

		const form = await superValidate(request, zod(EventSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			console.log("Updating event: ", form.data);
			const updated_event = await locals.pb.collection("events").update(event_id, form.data);

			return { update_form: form }; // i am struggling to have superform update, so use:enhance is turned off in the form
		} catch (error: unknown) {
			console.error(error);
			return handleError(error, form);
		}
	}
};
