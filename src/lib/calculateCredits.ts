import type { RecievedCredit, RecievedUser } from "$lib/db_types";

export function calculateCredits(credits: RecievedCredit[] | undefined, type: RecievedCredit["type"]): number {
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

export function calculateRequiredCredits(user: any, type: RecievedCredit["type"]): number {
    if (user.is_tutee) {
        throw new Error("Cannot calculate required credits for a user who is not an ARISTA member.");
    }
    let creditMap: Record<RecievedCredit["type"], number> = {
        event: 0,
        tutoring: 0,
        other: 0
    };
    if (user.graduationYear == 2025) {
        // seniors
        creditMap = {
            event: 17,
            tutoring: 3,
            other: 2
        };

    } else if (user.graduationYear == 2026) {
        // juniors
        creditMap = {
            event: 21,
            tutoring: 3,
            other: 4
        };
    } else if (user.graduationYear == 2027) {
        // sophomores
        creditMap = {
            event: 21,
            tutoring: 0,
            other: 0
        };
    } else {
        return "Error : Cannot calculate credits for an ARISTA member who isn't a current sophomore/junior/senior" as any as number;
        // throw new Error("Cannot calculate credits for an ARISTA member who isn't a current sophomore/junior/senior");
    }
    return creditMap[type];
};