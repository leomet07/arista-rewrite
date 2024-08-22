import type { SuperValidated } from "sveltekit-superforms";
import { setError } from "sveltekit-superforms";
import { z } from "zod";
import { zod } from 'sveltekit-superforms/adapters';
import type { Infer } from 'sveltekit-superforms';

export default function handleError(error: unknown, form: SuperValidated<Infer<z.AnyZodObject>>) {
	if (typeof error === "string") {
		return setError(form, "", error);
	} else if (error instanceof Error) {
		return setError(form, "", error.message);
	}
	return setError(form, "", "An unkown error occurred.");
}
