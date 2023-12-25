import { error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { RecievedCredit } from "$lib/db_types";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
	if (!locals.user) {
		return;
	}
	const credits = structuredClone(await locals.pb.collection("credits").getFullList() as unknown) as RecievedCredit[];

	return { credits };

}) satisfies PageServerLoad;
