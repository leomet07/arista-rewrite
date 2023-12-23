import { error } from "@sveltejs/kit";
import type { RecievedEvent } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
    const id = params.id;

    const events = await locals.pb
        .collection("events")
        .getFullList({ filter: `id="${id}"` });

    if (events.length == 0) {
        error(404, "Event not found.");
    }

    const serialized_event = structuredClone(
        events[0] as unknown
    ) as RecievedEvent;

    const serialized_event_with_time = {
        ...serialized_event,
        start_time: new Date(serialized_event.start_time),
        end_time: new Date(serialized_event.end_time)
    }

    return {
        event: serialized_event_with_time
    }
}) satisfies PageServerLoad;
