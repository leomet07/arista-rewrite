import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import { error, fail } from "@sveltejs/kit";
import type { RecievedServiceHour } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";

const schema = z.object({
	title: z.string().min(3).max(64),
	description: z.string().max(4000).optional(),
	num_of_hours: z.number().min(1).max(21)
});
// Get the data, for page load
export const load = (async ({ params, locals }) => {
	// Server API:
	const form = await superValidate(schema);
	if (!locals.user) {
		// If not logged in, return nothing
		return { db_service_hours: null, form };
	}

	const service_hours = await locals.pb
		.collection("service_hours")
		.getFullList({ sort: "-created", filter: `parent_user.id="${locals.user.id}"` });

	const serialized_service_hours = structuredClone(
		service_hours as unknown
	) as RecievedServiceHour[];

	if (service_hours) {
		return { db_service_hours: serialized_service_hours, form };
	}

	throw fail(404, { form });
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);

		// Convenient validation check:
		if (!form.valid) {
			return fail(400, { form });
		}

		if (!locals.user) {
			throw new Error("Not logged in.");
		}

		const createdHours = structuredClone(
			await locals.pb
				.collection("service_hours")
				.create({ ...form.data, parent_user: locals.user.id })
		) as RecievedServiceHour;

		return { form };
	}
};
