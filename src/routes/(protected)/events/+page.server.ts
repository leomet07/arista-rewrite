import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import { EventSchema, type RecievedEvent } from "$lib/db_types";
import handleError from "$lib/handleError";
import { zod } from 'sveltekit-superforms/adapters';


export const load = async () => {
    // Server API:
    const form = await superValidate(zod(EventSchema));
    return { form }; // Unless you throw, always return { form } in load and form actions.
};

export const actions: Actions = {
    create_event: async ({ locals, request }) => {
        const form = await superValidate(request, zod(EventSchema));

        if (!locals?.user?.id) {
            error(401, "User not logged in.");
        }

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            form.data.start_time.setSeconds(0); // remove any issues with seconds causing credits to be inaccurate
            form.data.end_time.setSeconds(0);  // remove any issues with seconds causing credits to be inaccurate
            const createdEvent = structuredClone(
                await locals.pb
                    .collection("events")
                    .create({ ...form.data, signed_up: [locals.user.id], event_owner: locals.user.id })
            ) as RecievedEvent;
        } catch (error: unknown) {
            console.error(error);
            return handleError(error, form);
        }

        return { form };
    }
};


// 
