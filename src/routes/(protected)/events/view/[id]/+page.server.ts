import { error } from "@sveltejs/kit";
import type { RecievedEvent } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
    const id = params.id;

    const events = await locals.pb
        .collection("events")
        .getFullList({
            filter: `id="${id}"`,
            // expand: "signed_up" 
            // expand will only include data from our user (bc view perms on db table), but it isn't even needed
        });

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

    let is_current_user_signed_up = serialized_event_with_time.signed_up.includes(locals?.user?.id);

    return {
        event: serialized_event_with_time,
        is_current_user_signed_up
    }
}) satisfies PageServerLoad;
