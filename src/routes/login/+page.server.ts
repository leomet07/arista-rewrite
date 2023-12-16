import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";

const LoginPageSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(64)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(LoginPageSchema);
	return { form }; // Unless you throw, always return { form } in load and form actions.
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, LoginPageSchema);

		try {
			await locals.pb.collection("users").authWithPassword(form.data.email, form.data.password);
		} catch (e) {
			console.error("Could not login", JSON.stringify(e));
			throw e;
		}

		throw redirect(303, "/");
	}
};
