<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { superForm } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";
	import { page } from "$app/stores";

	let message: string;
	$: message = $page.url.searchParams.get("message") ?? "";

	export let data: PageData;
	const formObj = superForm(data.form);
	const { form, errors, constraints } = formObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Reset Password</h1>
		<p>Enter your new password below.</p>
	</hgroup>

	{#if message}
		<aside class="alert variant-filled-success mb-4">
			<b>{message}</b>
		</aside>
	{/if}
	<ErrorComponent errors={$errors} />

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				await applyAction(result);
			};
		}}
		class="card p-4 w-full text-token space-y-4"
	>
		<InputField
			form={formObj}
			field="password"
			label="Enter your new password:"
			type="password"
		/>

		<InputField
			form={formObj}
			field="passwordConfirm"
			label="Confirm your new password:"
			type="password"
		/>

		<input type="submit" class="btn variant-filled" value="Reset Password" />
		<p id="back_to_login">
			<a href="/login" class="anchor">Back to login</a>
		</p>
	</form>
</main> 