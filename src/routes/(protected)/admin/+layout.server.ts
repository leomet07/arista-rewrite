import { fail } from "@sveltejs/kit";
import type { RecievedCredit, RecievedEvent, RecievedPublicUserData, RecievedUser } from "$lib/db_types.js";
import type { LayoutServerLoad } from "./$types";

// Get the data, for page load
export const load: LayoutServerLoad = (async ({ params, locals }) => {
    const users = await locals.pb
        .collection("users")
        .getFullList({ sort: "-created" });

    const serialized_users = structuredClone(
        users as unknown
    ) as RecievedUser[];


    const users_with_private_emails = (await locals.pb.collection("publicUsers").getFullList()) as unknown as RecievedPublicUserData[];
    const credits = structuredClone(await locals.pb.collection("credits").getFullList() as unknown) as RecievedCredit[];


    const serialized_users_with_emails = serialized_users.map(useri => {
        return {
            ...useri,
            email: users_with_private_emails.find((privateuser => privateuser.id == useri.id))?.email,
            credits: credits.filter(credit => credit.user == useri.id)
        };
    });


    return {
        users: serialized_users_with_emails
    };

});
