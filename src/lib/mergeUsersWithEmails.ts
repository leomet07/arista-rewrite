import type Client from "pocketbase";
import type { RecievedPublicUserData, RecievedUser } from "./db_types";

export default async function mergeUsersWithEmails(users: RecievedUser[], pb: Client) {
    const users_with_private_emails = (await pb.collection("publicUsers").getFullList()) as unknown as RecievedPublicUserData[]; // this only works for committee members
    return users.map(useri => {
        return {
            ...useri,
            email: users_with_private_emails.find((privateuser => privateuser.id == useri.id))?.email,
        };
    });
}
