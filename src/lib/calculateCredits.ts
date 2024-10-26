import type { RecievedCredit } from "$lib/db_types";

export default function calculateCredits(credits: RecievedCredit[] | undefined, type: "events" | "tutoring"): number {
    let total = 0;
    if (!credits) {
        return 0;
    }
    for (const credit of credits) {
        if ((type == "events" && credit.type == "event") || (type == "tutoring" && credit.type == "tutoring")) {
            total += credit.credits;
        }
    }
    return total;
}