import type { RecievedStrike } from "$lib/db_types";

export default function calculateTotalStrikeWeight(strikes: RecievedStrike[]) {
    return strikes.map((v) => v.weight).reduce((a, b) => a + b, 0);
}