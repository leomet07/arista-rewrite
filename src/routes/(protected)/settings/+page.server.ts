import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { z } from "zod";
import { zod } from 'sveltekit-superforms/adapters';
import handleError from "$lib/handleError";

const SettingsPageSchema = z
    .object({
        password: z.string().min(6).max(64),
        newPassword: z.string().min(6).max(64),
        newPasswordConfirm: z.string().min(6).max(64)
    })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
        message: "Passwords don't match",
        path: ["confirm"]
    });
export const load = async () => {
    // Server API:
    const form = await superValidate(zod(SettingsPageSchema));

    // Unless you throw, always return { form } in load and form actions.
    return { form };
};

export const actions: Actions = {
    change_password: async ({ locals, request }) => {
        const form = await superValidate(request, zod(SettingsPageSchema));

        if (!locals?.user?.id) {
            error(401, "User not logged in.");
        }
        // Convenient validation check:
        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }

        try {
            await locals.pb.collection("users").update(locals.user.id, {
                oldPassword: form.data.password,
                password: form.data.newPassword,
                passwordConfirm: form.data.newPasswordConfirm
            });
        } catch (error: any) {
            return handleError(error, form);
        }
        return { form };
    },
    delete_account: async ({ locals, request }) => {
        const form = await superValidate(request, zod(SettingsPageSchema));

        if (!locals?.user?.id) {
            error(401, "User not logged in.");
        }

        try {
            await locals.pb.collection("users").delete(locals.user.id);
            locals.pb.authStore.clear();
        } catch (error: any) {
            return handleError(error, form);
        }
        throw redirect(303, "/");
    },

};
