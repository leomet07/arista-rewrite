<script lang="ts">
	import type { PageData } from "./$types";
	import { goto, invalidateAll } from "$app/navigation";
	import { superForm } from "sveltekit-superforms";
	import { pb, currentUser } from "$lib/pocketbase";
	import { enhance, deserialize, applyAction } from "$app/forms";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";
	import { type ModalSettings } from "@skeletonlabs/skeleton";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { ActionResult } from "@sveltejs/kit";

	const modalStore = getModalStore();
	function deleteAllCookies() {
		document.cookie.split(";").forEach((cookie) => {
			const eqPos = cookie.indexOf("=");
			const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		});
	}
	async function logout() {
		deleteAllCookies();
		pb.authStore.clear();
		setTimeout(async () => {
			await goto("/"); // needs this to be on the next JIT cycle so that cookies clear properly
		}, 500);
	}

	export let data: PageData;
	const formObj = superForm(data.form);
	const { form, errors, constraints } = formObj;

	async function handleDeleteAccount(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		const confirmDelete: ModalSettings = {
			type: "confirm",
			title: "Delete account",
			body: "Are you sure you want to delete your account?",
			response: async (r: boolean) => {
				if (r) {
					const data = new FormData();
					console.log("Deleting account", event.currentTarget);
					// @ts-ignore
					const response = await fetch("/settings?/delete_account", {
						method: "POST",
						body: data
					});

					const result: ActionResult = deserialize(await response.text());

					if (result.type === "success") {
						// rerun all `load` functions, following the successful update
						await invalidateAll();
					}
					logout();
					applyAction(result);
				}
			}
		};
		modalStore.trigger(confirmDelete);
	}
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Settings</h1>
	{#if $currentUser}
		<section class="card p-4 w-full text-token">
			<h3 class="h3">Profile</h3>
			<p class="mb-4">
				Please contact <code class="font-bold">stuyaristanycweb@gmail.com</code> with any issues.
			</p>
			<p>Name: {$currentUser.name}</p>
			<p>Email: {$currentUser.email}</p>
			<p>Graduation Year: {$currentUser.graduationYear}</p>
			<p>OSIS: {$currentUser.osis}</p>
			<p>Homeroom: {$currentUser.homeroom}</p>
			<p>Committees: {$currentUser.committees.join(", ")}</p>
			<p class="mt-2">
				Your account is of type
				<span class="font-bold">"{$currentUser.is_tutee ? "tutee" : "ARISTA member"}"</span>.
			</p>
			<p class="italic mb-2">
				Note: If you are NOT an ARISTA member (ie: you are here to be tutored) but your account type
				is, <span class="underline">please delete your account and make a new one as a member</span>
				by checking the approriate checkbox.
			</p>
			<form method="POST" on:submit|preventDefault={handleDeleteAccount} action="?/delete_account">
				<button type="submit" class="btn variant-filled-error">Delete My Account</button>
			</form>
			<br />
			<a href="/" on:click={logout} class="btn variant-outline-primary">Logout</a>
		</section>
		<section>
			<form
				method="POST"
				action="?/change_password"
				class="card p-4 w-full text-token space-y-4"
				use:enhance
			>
				<ErrorComponent errors={$errors} />
				<h3 class="h3">Change password</h3>

				<InputField
					form={formObj}
					field="password"
					label="Enter your current password:"
					type="password"
				/>
				<InputField
					form={formObj}
					field="newPassword"
					label="Enter your new password:"
					type="password"
				/>
				<InputField
					form={formObj}
					field="newPasswordConfirm"
					label="Confirm your new password:"
					type="password"
				/>

				<button type="submit" class="btn variant-filled">Change password</button>
			</form>
		</section>
	{:else}
		<h2 class="h2">You must be logged in to view this page.</h2>
	{/if}
</main>
