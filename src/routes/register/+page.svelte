<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Register</h1>
		<p>Register to ARISTA with your Stuy.edu email!</p>
	</hgroup>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
		class="card p-4 w-full text-token space-y-4"
	>
		<label for="name">Enter your name:</label>
		<input
			class="input"
			type="text"
			name="name"
			placeholder="John Doe"
			aria-invalid={$errors.name ? "true" : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

		<label for="email">Enter your email:</label>
		<input
			class="input"
			type="email"
			name="email"
			placeholder="email@stuy.edu"
			aria-invalid={$errors.email ? "true" : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

		<label for="password">Enter a strong password:</label>
		<input
			class="input"
			type="password"
			name="password"
			placeholder="a_long_and_secure_password"
			aria-invalid={$errors.password ? "true" : undefined}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}

		<label for="passwordConfirm">Enter the password again:</label>
		<input
			class="input"
			type="password"
			name="passwordConfirm"
			placeholder=""
			aria-invalid={$errors.passwordConfirm ? "true" : undefined}
			bind:value={$form.passwordConfirm}
			{...$constraints.passwordConfirm}
		/>
		{#if $errors.passwordConfirm}<span class="invalid">{$errors.passwordConfirm}</span>{/if}

		<input type="submit" class="btn variant-filled" value="Register" />
	</form>
</main>
