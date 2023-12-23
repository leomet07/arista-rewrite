import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import { error, fail } from "@sveltejs/kit";
import type { RecievedEvent } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
    // Server API:
    // const form = await superValidate(schema);

    const events = await locals.pb
        .collection("events")
        .getFullList({ sort: "-created" });


    const serialized_events = structuredClone(
        events as unknown
    ) as RecievedEvent[];

    const events_with_time = serialized_events.map((v: RecievedEvent) => {
        return {
            ...v,
            start_time: new Date(v.start_time),
            end_time: new Date(v.end_time)
        }
    })

    if (events_with_time) {
        return { events: events_with_time };
    }

    throw fail(404, {});
}) satisfies PageServerLoad;
