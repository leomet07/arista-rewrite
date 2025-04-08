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

export const load = async ({ locals, request, url }) => {
	// Server API:
	const form = await superValidate(zod(RegisterPageSchema));

	if (locals.user) {
		// if logged in, redirect to home
		throw redirect(303, "/");
	}

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(RegisterPageSchema));
		console.log("POST", form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		console.log("Trying to create user: ", JSON.stringify(form.data, null, 2));

		form.data.is_tutee = true; // by default, all sign ups are tutees!

		try {
			await locals.pb.collection<RecievedUser>("users").create(form.data); // create user
			await locals.pb.collection("users").authWithPassword(form.data.email, form.data.password); // login
		} catch (error: unknown) {
			console.log("Unkown error: ", error);
			return handleError(error, form);
		}
		const redirectTo = url.searchParams.get("redirectTo");
		if (redirectTo) {
			// always have slash in front so no malicous URL inserted
			throw redirect(303, "/" + redirectTo.slice(1));
		} else {
			throw redirect(303, "/");
		}
		// return { form };
	}
};
