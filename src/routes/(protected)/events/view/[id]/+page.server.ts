import { error } from "@sveltejs/kit";
import type { RecievedEvent, RecievedUser } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";
import { isOnCommittee } from "$lib/isOnCommittee";
import { determinteEventCredits } from "$lib/determinteCredits";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
	const id = params.id;

	const event = await locals.pb.collection("events").getOne(id, { requestKey: null });

	const serialized_event = structuredClone(event as unknown) as RecievedEvent;

	const serialized_event_with_time = {
		...serialized_event,
		start_time: new Date(serialized_event.start_time),
		end_time: new Date(serialized_event.end_time)
	};

	let is_current_user_signed_up = serialized_event_with_time.signed_up.includes(locals?.user?.id);

	return {
		event: serialized_event_with_time,
		is_current_user_signed_up
	};
}) satisfies PageServerLoad;

export const actions = {
	event_sign_up: async ({ request, locals, params }) => {
		const event_id = params.id;

		if (!locals.user) {
			error(401, "User not logged in.");
		}

		const event = await locals.pb.collection("events").getOne(event_id);

		const serialized_event = structuredClone(event as unknown) as RecievedEvent;

		await locals.pb.collection<RecievedEvent>("events").update(event_id, {
			signed_up: [...serialized_event.signed_up, locals.user.id]
		});
	},
	event_unsign_up: async ({ request, locals, params }) => {
		const event_id = params.id;

		if (!locals.user) {
			error(401, "User not logged in.");
		}

		const event = await locals.pb.collection("events").getOne(event_id);

		const serialized_event = structuredClone(event as unknown) as RecievedEvent;

		await locals.pb.collection<RecievedEvent>("events").update(event_id, {
			signed_up: serialized_event.signed_up.filter((sid) => sid != locals?.user?.id)
		});
	},
	mark_event_as_completed: async ({ request, locals, params }) => {
		const event_id = params.id;

		if (!locals.user) {
			error(401, "User not logged in.");
		}

		if (!isOnCommittee(locals.user as RecievedUser, "events")) {
			error(401, "User is not a member of the events committee.");
		}
		// Give credits
		const event = await locals.pb.collection("events").getOne(event_id);

		let serialized_event = structuredClone(event as unknown) as RecievedEvent;

		serialized_event = {
			...serialized_event,
			start_time: new Date(serialized_event.start_time),
			end_time: new Date(serialized_event.end_time)
		};

		const credits = determinteEventCredits(serialized_event);

		const promises = serialized_event.signed_up.map((v) =>
			locals.pb.collection("credits").create(
				{
					credits,
					event: event_id,
					user: v
				},
				{ requestKey: null } // requestKey is null here to avoid cancelled requests when successive requests are ran
			)
		);

		await Promise.all(promises);

		await locals.pb.collection<RecievedEvent>("events").update(
			event_id,
			{
				isComplete: true
			},
			{ requestKey: null }
		);
	}
};
