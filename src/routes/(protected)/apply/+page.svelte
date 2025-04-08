<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { superForm } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";
	import { page } from "$app/stores";

	export let data: PageData;
	const formObj = superForm(data.form);
	const { form, errors, constraints } = formObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Apply to ARISTA</h1>
		<p>Welcome to the ARISTA application.</p>
	</hgroup>

	<ErrorComponent errors={$errors} />

	{#if data.userApplication && data.userApplication.submitted}
		<aside class="alert variant-filled-success mb-4">
			<b>You have already submitted your application to ARISTA.</b>
		</aside>
	{:else}
		<form method="POST" class="card p-4 w-full text-token space-y-4">
			<InputField
				form={formObj}
				field="q1"
				label="q1:"
				placeholder="Lorem Ipsum Dolor..."
				type="text"
			/>
			<InputField
				form={formObj}
				field="q2"
				label="q2:"
				placeholder="Lorem Ipsum Dolor..."
				type="text"
			/>
			<InputField
				form={formObj}
				field="q3"
				label="q3:"
				placeholder="Lorem Ipsum Dolor..."
				type="text"
			/>
			<InputField
				form={formObj}
				field="q4"
				label="q4:"
				placeholder="Lorem Ipsum Dolor..."
				type="text"
			/>
			<InputField
				form={formObj}
				field="q5"
				label="q5:"
				placeholder="Lorem Ipsum Dolor..."
				type="text"
			/>

			<input type="submit" class="btn variant-filled" value="Save Application" />
		</form>
	{/if}
</main>
