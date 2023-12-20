import type { SuperValidated } from "sveltekit-superforms";
import { setError } from "sveltekit-superforms/server";
import { z } from "zod";

export default function handleError(error: unknown, form: SuperValidated<z.AnyZodObject>) {
	if (typeof error === "string") {
		return setError(form, "", error);
	} else if (error instanceof Error) {
		return setError(form, "", error.message);
	}
	return setError(form, "", "An unkown error occurred.");
}
