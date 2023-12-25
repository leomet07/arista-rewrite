import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { EventSchema, TutoringRequestSchema, type RecievedTutoringRequest } from "$lib/db_types";
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
        .getFullList({ sort: "-created" }) as unknown) as RecievedTutoringRequest[];

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
    }
};

