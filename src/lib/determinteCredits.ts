import type { RecievedEvent } from "./db_types";

export function determinteEventCredits(event: RecievedEvent): number {
    const end_time = new Date(event.end_time.valueOf());
    const start_time = new Date(event.start_time.valueOf());
    end_time.setSeconds(0); // prevent issues with old events having non zero seconds 
    start_time.setSeconds(0); // prevent issues with old events having non zero seconds 

    const diff_in_ms = Number(end_time) - Number(start_time);
    const half_hours = Math.floor((((diff_in_ms / 1000) / 60)) / 30);
    const credits = (half_hours / 2) * event.multiplier; // halves are possible here
    return credits;
}