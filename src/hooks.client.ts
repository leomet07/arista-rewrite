import type { RecievedUser } from "$lib/db_types";
import { currentUser, pb } from "$lib/pocketbase";

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.record as RecievedUser);
	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});
