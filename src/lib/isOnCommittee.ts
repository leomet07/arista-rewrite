import { z } from "zod";
import type { RecievedUser, CommitteesSchema } from "./db_types";

export function isOnCommittee(user: RecievedUser | undefined, committee: z.infer<typeof CommitteesSchema>): boolean {
    // admin can act as if on any committee
    return (!!user) && (user.committees.includes("admin") || user.committees.includes(committee));
};