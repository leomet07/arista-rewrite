import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";
import { setError, superValidate, fail } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';

const LoginPageSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(64)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(zod(LoginPageSchema));
	return { form }; // Unless you throw, always return { form } in load and form actions.
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(LoginPageSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection("users").authWithPassword(form.data.email, form.data.password);
		} catch (error: unknown) {
			return setError(form, "", "Incorrect email or password.");
		}

		const redirectTo = url.searchParams.get("redirectTo");
		if (redirectTo) {
			// always have slash in front so no malicous URL inserted
			throw redirect(303, "/" + redirectTo.slice(1));
		} else {
			throw redirect(303, "/");
		}
	}
};
