import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { superValidate, setError } from "sveltekit-superforms";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { UserSchema, type RecievedUser } from "$lib/db_types";
import handleError from "$lib/handleError";

const RegisterPageSchema = UserSchema.merge(z.object({
	graduationYear: z.number().min(2023).max(2999).default("" as unknown as number),
	osis: z.number().min(1).max(999999999).default("" as unknown as number),
	password: z.string().min(6).max(64),
	passwordConfirm: z.string().min(6).max(64)
})).omit({ committees: true }).refine((data) => data.password === data.passwordConfirm, {
	message: "Passwords don't match"
});

export const load = async () => {
	// Server API:
	const form = await superValidate(zod(RegisterPageSchema));

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(RegisterPageSchema));
		console.log("POST", form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		console.log("Trying to create user: ", JSON.stringify(form.data, null, 2));

		try {
			await locals.pb.collection("users").getFirstListItem(`email="${form.data.email}"`);
			// If it does not error, then email is taken
			return setError(form, "", "An account with that email already exists.");
		} catch (error: unknown) { }

		try {
			await locals.pb.collection<RecievedUser>("users").create(form.data); // create user
			await locals.pb.collection("users").authWithPassword(form.data.email, form.data.password); // login
		} catch (error: unknown) {
			return handleError(error, form);
		}
		throw redirect(303, "/");
		// return { form };
	}
};
