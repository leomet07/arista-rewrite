import { pb } from "$lib/pocketbase";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	// before
	pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");
	if (pb.authStore.isValid) {
		try {
			await pb.collection("users").authRefresh();
		} catch (_) {
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = structuredClone(pb.authStore.model);

	if (event.url.pathname.startsWith("/events") || event.url.pathname.startsWith("/settings")) {
		if (!event.locals.user) { // if not logged in, redirect
			// TODO: ADD HUNTABYTE-INSPIRED REDIRECT SYSTEM
			throw redirect(303, "/login");
		}
	}

	const response = await resolve(event);

	// after
	response.headers.set("set-cookie", pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
