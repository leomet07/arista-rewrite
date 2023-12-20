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
		<h1 class="h1">Sign in</h1>
		<p>Sign in to ARISTA with your Stuy.edu email!</p>
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

		<label for="password">Enter your password:</label>
		<input
			class="input"
			type="password"
			name="password"
			placeholder=""
			aria-invalid={$errors.password ? "true" : undefined}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}

		<input type="submit" class="btn variant-filled" value="Log in" />
		<p id="suggest_register">
			Don't have an account? <a href="/register" class="anchor">Register for one.</a>
		</p>
	</form>
</main>
