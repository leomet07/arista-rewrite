import type { SuperValidated } from "sveltekit-superforms";
import { setError } from "sveltekit-superforms";
import { z } from "zod";
import type { Infer } from 'sveltekit-superforms';
import { error } from "@sveltejs/kit";

export default function handleError(error: unknown, form: SuperValidated<Infer<z.AnyZodObject>>) {
	if (typeof error === "string") {
		return setError(form, "", error);
	} else if (error instanceof Error) {
		return setError(form, "", error.message);
	}
	return setError(form, "", "An unkown error occurred.");
}

export function handleGenericError(error_param: unknown) {
	if (typeof error_param === "string") {
		error(400, error_param);
	} else if (error_param instanceof Error) {
		error(400, error_param.message);
	}
	return error(400, "An unkown error occurred.");
}