import type { RecievedEvent } from "./db_types";

export function determinteEventCredits(event: RecievedEvent): number {
    const diff_in_ms = Number(event.end_time) - Number(event.start_time);
    const half_hours = Math.floor((((diff_in_ms / 1000) / 60)) / 30);
    const credits = (half_hours / 2) * event.multiplier; // halves are possible here
    return credits;
}