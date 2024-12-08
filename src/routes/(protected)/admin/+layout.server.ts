import { fail } from "@sveltejs/kit";
import type {
	RecievedCredit,
	RecievedUser,
	RecievedStrike,
	ExpandedCredit,
	OpenUser
} from "$lib/db_types.js";
import type { LayoutServerLoad } from "./$types";
import mergeUsersWithEmails from "$lib/mergeUsersWithEmails";

// Get the data, for page load
export const load: LayoutServerLoad = async ({ params, locals }) => {
	const users = await locals.pb.collection("users").getFullList({ sort: "-created" });

	const serialized_users = structuredClone(users as unknown) as RecievedUser[];

	const users_with_emails = await mergeUsersWithEmails(serialized_users, locals.pb);

	const credits = structuredClone(
		(await locals.pb
			.collection("credits")
			.getFullList({ expand: "event,session,session.tutoringRequest" })) as unknown
	) as ExpandedCredit[];
	const strikes = structuredClone(
		(await locals.pb.collection("strikes").getFullList()) as unknown
	) as RecievedStrike[];

	const serialized_users_with_emails = users_with_emails.map((useri) => {
		return {
			...useri,
			credits: credits.filter((credit) => credit.user == useri.id),
			strikes: strikes.filter((strike) => strike.strikedUser == useri.id)
		} as OpenUser;
	});

	return {
		users: serialized_users_with_emails
	};
};
