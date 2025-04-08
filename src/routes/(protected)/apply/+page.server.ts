import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import { ApplicationSchema, type RecievedApplication, type RecievedEvent } from "$lib/db_types";
import handleError from "$lib/handleError";
import { zod } from 'sveltekit-superforms/adapters';
import type Client from "pocketbase";

let InProgressApplicationSchema = ApplicationSchema.partial();

async function getUserApplication(pb: Client, applicant_id: string): Promise<RecievedApplication | undefined> {
    // has user applied before? 
    const applications = await pb.collection("applications").getFullList({ filter: `applicant="${applicant_id}"` }) as unknown as RecievedApplication[]; // should only be able to see your own application
    return applications.length > 0 ? applications[0] : undefined;

}
export const load = async ({ locals }) => {
    // Server API:
    if (!locals.user) {
        error(401, "User not logged in.");
    }

    let userApplication = await getUserApplication(locals.pb, locals.user.id);

    const form = await superValidate(userApplication, zod(InProgressApplicationSchema));

    return { form, userApplication }; // Unless you throw, always return { form } in load and form actions.
};


export const actions: Actions = {
    default: async ({ locals, request, url }) => {
        const form = await superValidate(request, zod(InProgressApplicationSchema));

        if (!locals.user) {
            error(401, "User not logged in.");
        }

        // Convenient validation check:
        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }

        console.log("Submitted Application: ", form.data);

        let userApplication = await getUserApplication(locals.pb, locals.user.id);


        let body: Partial<RecievedApplication> = {
            ...form.data,
            applicant: locals.user.id,
            submitted: false
        };

        let new_application;
        if (!userApplication) {
            new_application = await locals.pb.collection("applications").create(body) as unknown as RecievedApplication;
            console.log("Created application: ", new_application);
        } else {
            new_application = await locals.pb.collection("applications").update(userApplication.id, body, {}) as unknown as RecievedApplication;
            console.log("Updated application: ", new_application);
        }

        let newForm = await superValidate(new_application, zod(InProgressApplicationSchema));


        return { form: newForm };

    }
};