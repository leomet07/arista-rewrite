import { error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { RecievedCredit } from "$lib/db_types";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
	if (!locals.user || locals.user.is_tutee) {
		return;
	}
	const credits = structuredClone(await locals.pb.collection("credits").getFullList({ "filter": `user="${locals.user.id}"` }) as unknown) as RecievedCredit[];

	return { credits };

}) satisfies PageServerLoad;
