import type { RecievedCredit } from "$lib/db_types";

export default function calculateCredits(credits: RecievedCredit[] | undefined, type: "event" | "tutoring" | "other"): number {
    let total = 0;
    if (!credits) {
        return 0;
    }
    for (const credit of credits) {
        if (type == credit.type) {
            total += credit.credits;
        }
    }
    return total;
}