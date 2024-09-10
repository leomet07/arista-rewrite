import { fail } from "@sveltejs/kit";
import type { RecievedCredit, RecievedUser } from "$lib/db_types.js";
import type { LayoutServerLoad } from "./$types";
import mergeUsersWithEmails from "$lib/mergeUsersWithEmails";

// Get the data, for page load
export const load: LayoutServerLoad = (async ({ params, locals }) => {
    const users = await locals.pb
        .collection("users")
        .getFullList({ sort: "-created" });

    const serialized_users = structuredClone(
        users as unknown
    ) as RecievedUser[];

    const users_with_emails = await mergeUsersWithEmails(serialized_users, locals.pb);

    const credits = structuredClone(await locals.pb.collection("credits").getFullList() as unknown) as RecievedCredit[];

    const serialized_users_with_emails = users_with_emails.map(useri => {
        return {
            ...useri,
            credits: credits.filter(credit => credit.user == useri.id)
        };
    });


    return {
        users: serialized_users_with_emails
    };

});
