import { fail, redirect } from "@sveltejs/kit";
import type { Actions, ServerLoad } from "@sveltejs/kit";
import { superValidate, setError } from "sveltekit-superforms";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import handleError from "$lib/handleError";

const ResetPasswordSchema = z.object({
	password: z.string().min(6).max(64),
	passwordConfirm: z.string().min(6).max(64)
}).refine((data) => data.password === data.passwordConfirm, {
	message: "Passwords don't match"
});

export const load: ServerLoad = async ({ url }) => {
	const token = url.searchParams.get("token");
	if (!token) {
		throw redirect(303, "/forgot-password");
	}

	const form = await superValidate(zod(ResetPasswordSchema));
	return { form, token };
};

export const actions: Actions = {
	default: async ({ locals, request, url }: { locals: App.Locals; request: Request; url: URL }) => {
		const form = await superValidate(request, zod(ResetPasswordSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const token = url.searchParams.get("token");
		if (!token) {
			return fail(400, { form, message: "Invalid or missing token." });
		}

		try {
			await locals.pb.collection("users").confirmPasswordReset(token, form.data.password, form.data.passwordConfirm);
			// Log out the user after successful password reset
			locals.pb.authStore.clear();
			return {
				form,
				message: "Your password has been reset successfully."
			};
		} catch (error: unknown) {
			return handleError(error, form);
		}
	}
}; 