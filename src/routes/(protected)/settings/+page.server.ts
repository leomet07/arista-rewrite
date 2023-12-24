import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { superValidate, setError } from "sveltekit-superforms/server";
import { z } from "zod";
import type { RecievedUser } from "$lib/db_types";
import handleError from "$lib/handleError";

const RegisterPageSchema = z
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
    const form = await superValidate(RegisterPageSchema);

    // Unless you throw, always return { form } in load and form actions.
    return { form };
};

export const actions: Actions = {
    change_password: async ({ locals, request }) => {
        const form = await superValidate(request, RegisterPageSchema);
        console.log("POST", form);

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
    }
};
