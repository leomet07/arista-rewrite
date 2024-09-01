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

	async function logout() {
		pb.authStore.clear();
		await goto("/");
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
		<section>
			<h2 class="h2">Profile</h2>
			<p>Name: {$currentUser.name}</p>
			<p>Email: {$currentUser.email}</p>
			<p>Osis: {$currentUser.osis}</p>
			<p>Homeroom: {$currentUser.homeroom}</p>
			<p>Committees: {JSON.stringify($currentUser.committees)}</p>
			<p>Is tutee?: {$currentUser.is_tutee}</p>
		</section>
		<section>
			<form
				method="POST"
				action="?/change_password"
				class="card p-4 w-full text-token space-y-4"
				use:enhance
			>
				<ErrorComponent errors={$errors._errors} />
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
		<a href="/" on:click={logout} class="btn variant-outline-primary">Logout</a>
		<br />
		<form method="POST" on:submit|preventDefault={handleDeleteAccount} action="?/delete_account">
			<button type="submit" class="btn variant-filled-error">Delete My Account</button>
		</form>
	{:else}
		<h2 class="h2">You must be logged in to view this page.</h2>
	{/if}
</main>
