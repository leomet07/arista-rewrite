import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { EventSchema, TutoringRequestSchema, type RecievedTutoringRequest, type RecievedTutoringSession } from "$lib/db_types";
import handleError from "$lib/handleError";
import { z } from "zod";

let RequestTutoringSchema = TutoringRequestSchema.omit({ tutee: true }); // don't include tutee in form;

export const load = async ({ locals, request }) => {
    // Server API:
    const form = await superValidate(RequestTutoringSchema);

    if (!locals?.user?.id) {
        error(401, "User not logged in.");
    }

    const requests = structuredClone(await locals.pb
        .collection("tutoringRequests")
        .getFullList({ sort: "-created", filter: "isClaimed=false" }) as unknown) as RecievedTutoringRequest[];

    return { form, tutoringRequests: requests }; // Unless you throw, always return { form } in load and form actions.
};

export const actions: Actions = {
    request_tutoring: async ({ locals, request }) => {
        const form = await superValidate(request, RequestTutoringSchema);

        if (!locals?.user?.id) {
            error(401, "User not logged in.");
        }

        if (!locals?.user?.is_tutee) {
            error(401, "User is not a tutee.");
        }
        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await locals.pb
                .collection("tutoringRequests").create({ ...form.data, tutee: locals.user.id });
        } catch (error: unknown) {
            console.error(error);
            return handleError(error, form);
        }

        return { form };
    },
    claim_tutoring_request: async ({ locals, request, params, url }) => {
        console.log(request, params, url);
        if (!locals?.user?.id) {
            error(401, "User not logged in.");
        }

        if (locals?.user?.is_tutee) {
            error(401, "A tutee cannot claim a request.");
        }

        const searchParams = url.searchParams;
        const tutoring_request_id = searchParams.get("id");
        if (!tutoring_request_id) {
            error(400, "A tutoring request ID must be passed in as a parameter to claim it.");
        }

        try {
            // get the tutoring request
            const tutoringRequest = structuredClone(await locals.pb
                .collection("tutoringRequests").getOne(tutoring_request_id) as unknown) as RecievedTutoringRequest;

            // create the tutoringSession
            await locals.pb
                .collection("tutoringSessions").create({
                    tutee: tutoringRequest.tutee,
                    tutor: locals.user.id,
                    tutoringRequest: tutoring_request_id,
                    isComplete: false
                });

            // update the tutoring request
            await locals.pb.collection("tutoringRequests").update(tutoring_request_id,
                { isClaimed: true }
            );

        } catch (error: unknown) {
            console.error(error);
        }

    }
};

