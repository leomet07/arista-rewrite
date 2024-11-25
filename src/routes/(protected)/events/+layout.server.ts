import { fail } from "@sveltejs/kit";
import type { RecievedEvent } from "$lib/db_types.js";
import type { LayoutServerLoad } from "./$types";

// Get the data, for page load
export const load: LayoutServerLoad = (async ({ params, locals }) => {
    const events = await locals.pb
        .collection("events")
        .getFullList({ sort: "-created", requestKey: null });
    // TODO: either fetch all (not just max of 500) events or just events for this/last year


    const serialized_events = structuredClone(
        events as unknown
    ) as RecievedEvent[];

    const events_with_time = serialized_events.map((v: RecievedEvent) => {
        return {
            ...v,
            start_time: new Date(v.start_time),
            end_time: new Date(v.end_time)
        };
    });

    if (events_with_time) {
        return { events: events_with_time };
    }

    throw fail(404, {});
});
