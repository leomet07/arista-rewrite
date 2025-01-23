import { error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { ExpandedCredit, RecievedStrike, RecievedEvent } from "$lib/db_types";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
	if (!locals.user || locals.user.is_tutee) {
		return;
	}
	const credits = structuredClone(await locals.pb.collection("credits").getFullList({ "filter": `user="${locals.user.id}"`, expand: "event,session,session.tutoringRequest", requestKey: null }) as unknown) as ExpandedCredit[];
	const strikes = structuredClone(await locals.pb.collection("strikes").getFullList({ "filter": `strikedUser="${locals.user.id}"`, requestKey: null }) as unknown) as RecievedStrike[];
	const signed_up_events = structuredClone(await locals.pb.collection("events").getFullList({ "filter": `signed_up~"${locals.user.id}" && isComplete=false`, sort: "start_time", requestKey: null }) as unknown) as RecievedEvent[];

	return { credits, strikes, signed_up_events };

}) satisfies PageServerLoad;
