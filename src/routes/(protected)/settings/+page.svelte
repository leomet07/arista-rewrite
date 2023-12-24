<script lang="ts">
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { superForm } from "sveltekit-superforms/client";
	import { pb, currentUser } from "$lib/pocketbase";
	import { enhance } from "$app/forms";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";

	async function logout() {
		pb.authStore.clear();
		await goto("/");
	}

	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Settings</h1>
	{#if $currentUser}
		<section>
			<h2 class="h2">Profile</h2>
			<p>Name: {$currentUser.name}</p>
			<p>Email: {$currentUser.email}</p>
			<p>Four Digit Id: {$currentUser.four_digit_id}</p>
			<p>Homeroom: {$currentUser.homeroom}</p>
			<p>Committees: {JSON.stringify($currentUser.committees)}</p>
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
				<label for="password">Enter your current password:</label>
				<input
					class="input"
					type="password"
					name="password"
					aria-invalid={$errors.password ? "true" : undefined}
					bind:value={$form.password}
					{...$constraints.password}
				/>
				{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}

				<label for="newPassword">Enter your new password:</label>
				<input
					class="input"
					type="password"
					name="newPassword"
					aria-invalid={$errors.newPassword ? "true" : undefined}
					bind:value={$form.newPassword}
					{...$constraints.newPassword}
				/>
				{#if $errors.newPassword}<span class="invalid">{$errors.newPassword}</span>{/if}
				<label for="newPasswordConfirm">Confirm your new password:</label>
				<input
					class="input"
					type="password"
					name="newPasswordConfirm"
					aria-invalid={$errors.newPasswordConfirm ? "true" : undefined}
					bind:value={$form.newPasswordConfirm}
					{...$constraints.newPasswordConfirm}
				/>
				{#if $errors.newPasswordConfirm}<span class="invalid">{$errors.newPasswordConfirm}</span
					>{/if}

				<button type="submit" class="btn variant-filled">Change password</button>
			</form>
		</section>
		<a href="/" on:click={logout} class="btn variant-outline-primary">Logout</a>
	{:else}
		<h2 class="h2">You must be logged in to view this page.</h2>
	{/if}
</main>
