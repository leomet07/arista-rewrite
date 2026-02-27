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

const ChoiceModeSchema = z.object({
    choice: z.union([z.literal("true"), z.literal("false")])
});

function extractPbErrorMessage(error: unknown): string {
    if (typeof error === "object" && error !== null) {
        const maybeError = error as { response?: { message?: string; data?: unknown; }; message?: string; };
        if (maybeError.response?.message) {
            return maybeError.response.message;
        }
        if (typeof maybeError.message === "string" && maybeError.message.length > 0) {
            return maybeError.message;
        }
    }
    return "PocketBase update failed.";
}

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
    toggle_choice: async ({ locals, request }) => {
        if (!locals?.user?.id) {
            error(401, "User not logged in.");
        }
        if (locals.user.is_tutee) {
            return fail(403, { choiceError: "Tutee accounts do not have credit requirements." });
        }

        const rawFormData = Object.fromEntries(await request.formData());
        const parsed = ChoiceModeSchema.safeParse(rawFormData);
        if (!parsed.success) {
            return fail(400, { choiceError: "Invalid requirement mode value." });
        }

        const choiceValue = parsed.data.choice === "true";

        const updatePayloads: Array<Record<string, boolean>> = [
            // Keep both fields aligned when both exist.
            { choice: choiceValue, priority: choiceValue },
            { choice: choiceValue },
            { priority: choiceValue }
        ];
        let didUpdate = false;
        let updateError: unknown;
        for (const payload of updatePayloads) {
            try {
                await locals.pb.collection("users").update(locals.user.id, payload);
                didUpdate = true;
                break;
            } catch (err) {
                updateError = err;
            }
        }
        if (!didUpdate) {
            return fail(400, {
                choiceError: `Failed to update credit requirement mode. ${extractPbErrorMessage(updateError)}`
            });
        }

        try {
            await locals.pb.collection("users").authRefresh({ requestKey: null });
        } catch (refreshError) {
            return fail(400, {
                choiceError: `Saved mode, but failed to refresh auth state. ${extractPbErrorMessage(refreshError)}`
            });
        }

        return { choiceUpdated: true };
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
