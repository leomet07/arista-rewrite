import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase, { type AuthModel } from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

export const currentUser = writable<AuthModel>(pb.authStore.model);

pb.authStore.onChange((auth) => {
	// console.log("authStore changed", auth);
	currentUser.set(pb.authStore.model);
});
