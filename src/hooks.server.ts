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

	if (event.url.pathname.startsWith("/events") || event.url.pathname.startsWith("/settings") || event.url.pathname.startsWith("/tutoring")) {
		if (!event.locals.user) { // if not logged in, redirect
			// Redirection inspired by https://www.youtube.com/watch?v=ieECVME5ZLU
			const fromUrl = event.url.pathname + event.url.search;
			const message = "You must be logged in to access that page.";
			throw redirect(303, `/login?redirectTo=${fromUrl}&message=${message}`);
		}
	}

	if ((event.url.pathname.startsWith("/events")) && event.locals.user && event.locals.user.is_tutee) {
		// Redirection inspired by https://www.youtube.com/watch?v=ieECVME5ZLU
		const fromUrl = event.url.pathname + event.url.search;
		const message = "Tutees cannot access that page.";
		throw redirect(303, `/login?redirectTo=${fromUrl}&message=${message}`);
	}

	const response = await resolve(event);

	// after
	response.headers.set("set-cookie", pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
