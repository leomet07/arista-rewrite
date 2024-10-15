import { error, redirect } from "@sveltejs/kit";
import { EventSchema, type ExpandedEvent, type RecievedCredit, type RecievedEvent, type RecievedUser } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";
import { isOnCommittee } from "$lib/isOnCommittee";
import { z } from "zod";
import type { Actions } from "./$types";
import { superValidate, setError } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import handleError from "$lib/handleError";

const StrikeUserSchema = z
    .object({
        reason: z.string().min(1).max(256),
        weight: z.number().positive().default(1)
    });


// Get the data, for page load
export const load = (async ({ params, locals }) => {
    const form = await superValidate(zod(StrikeUserSchema));
    const user_id = params.id;

    // Unless you throw, always return { form } in load and form actions.

    if (!locals.user) {
        error(401, "You are not logged in.");
    }

    if (!isOnCommittee(locals.user as RecievedUser, "admin")) {
        error(401, "You are not a member of the addmin committee.");
    }

    let user;

    try {
        user = await locals.pb.collection("users").getOne(user_id, { requestKey: null });
        if (!user) {
            error(401, `User with id of "${user_id}" does not exist.`);
        }
    } catch {
        error(401, `User with id of "${user_id}" does not exist.`);
    }

    return {
        user: user,
        form
    };
}) satisfies PageServerLoad;


export const actions = {
    strike_user: async ({ request, locals, params }) => {
        const form = await superValidate(request, zod(StrikeUserSchema));
        const user_id = params.id;

        // Unless you throw, always return { form } in load and form actions.

        if (!locals.user) {
            error(401, "You are not logged in.");
        }

        if (!isOnCommittee(locals.user as RecievedUser, "admin")) {
            error(401, "You are not a member of the addmin committee.");
        }

        let user;

        try {
            user = await locals.pb.collection("users").getOne(user_id, { requestKey: null });
            if (!user) {
                error(401, `User with id of "${user_id}" does not exist.`);
            }
        } catch {
            error(401, `User with id of "${user_id}" does not exist.`);
        }

        const created_strike = await locals.pb.collection("strikes").create(
            {
                strikedUser: user.id,
                reason: form.data.reason,
                weight: form.data.weight
            },
            { requestKey: null } // requestKey is null here to avoid cancelled requests when successive requests are ran
        );

        return {
            user: user,
            form
        };
    }

};