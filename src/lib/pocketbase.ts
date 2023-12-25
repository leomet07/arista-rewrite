import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase";
import { writable } from "svelte/store";
import type { RecievedUser } from "./db_types";

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

export const currentUser = writable<RecievedUser | undefined>(pb.authStore.model as RecievedUser);

pb.authStore.onChange((auth) => {
	// console.log("authStore changed", auth);
	currentUser.set(pb.authStore.model as RecievedUser);
});
