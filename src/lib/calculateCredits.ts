import type { RecievedCredit, ExpandedCredit, RecievedEvent } from "$lib/db_types";

export function calculateCredits(
	credits: RecievedCredit[] | ExpandedCredit[] | undefined,
	type: RecievedCredit["type"]
): number {
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
		if (user.committees.includes("events")) {
			creditMap = {
				event: 0,
				tutoring: 2,
				other: 1
			};
		}
		if (user.committees.includes("operations")) {
			creditMap = {
				event: 12,
				tutoring: 2,
				other: 1
			};
		}
		if (user.committees.includes("web")) {
			creditMap = {
				event: 14,
				tutoring: 2,
				other: 2
			};
		}
	} else if (user.graduationYear == 2026) {
		// juniors
		creditMap = {
			event: 21,
			tutoring: 3,
			other: 4
		};
		if (user.committees.includes("events")) {
			creditMap = {
				event: 0,
				tutoring: 2,
				other: 2
			};
		}
		if (user.committees.includes("operations")) {
			creditMap = {
				event: 16,
				tutoring: 2,
				other: 2
			};
		}
		if (user.committees.includes("web")) {
			creditMap = {
				event: 18,
				tutoring: 2,
				other: 3
			};
		}
	} else if (user.graduationYear == 2027) {
		// sophomores
		creditMap = {
			event: 21,
			tutoring: 0,
			other: 0
		};
		if (user.committees.includes("events")) {
			creditMap = {
				event: 0,
				tutoring: 0,
				other: 0
			};
		}
		if (user.committees.includes("operations")) {
			creditMap = {
				event: 16,
				tutoring: 0,
				other: 0
			};
		}
		if (user.committees.includes("web")) {
			creditMap = {
				event: 18,
				tutoring: 0,
				other: 0
			};
		}
	} else {
		return "Error : Cannot calculate credits for an ARISTA member who isn't a current sophomore/junior/senior" as any as number;
		// throw new Error("Cannot calculate credits for an ARISTA member who isn't a current sophomore/junior/senior");
	}
	return creditMap[type];
}

export function calculateEventCredits(event: RecievedEvent): number {
	const end_time = new Date(event.end_time.valueOf());
	const start_time = new Date(event.start_time.valueOf());
	end_time.setSeconds(0); // prevent issues with old events having non zero seconds
	start_time.setSeconds(0); // prevent issues with old events having non zero seconds

	const diff_in_ms = Number(end_time) - Number(start_time);
	const half_hours = Math.floor(diff_in_ms / 1000 / 60 / 30);
	const credits = (half_hours / 2) * event.multiplier; // halves are possible here
	return credits;
}
