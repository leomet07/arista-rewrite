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
				label="Why do you want to be a member of ARISTA? (Max. 1000 characters)"
				placeholder=""
				type="text"
			/>
			<InputField
				form={formObj}
				field="q2"
				label="Describe a way that you are involved in your community (your neighborhood, NYC, Stuyvesant, etc.) that has been meaningful to you. What did you learn from the experience? (Max. 2000 characters)"
				placeholder=""
				type="text"
			/>
			<InputField
				form={formObj}
				field="q3"
				label="If you have not previously been engaged in your community, what impact would you like to have in the future? And how do you hope ARISTA will help those endeavors? (Max. 2000 characters)"
				placeholder=""
				type="text"
			/>
			<InputField
				form={formObj}
				field="q4"
				label="Choose a quote that resonates with you. Explain how it demonstrates your values, beliefs, or experiences in the world. Feel free to explore your creativity in answering this. (Max. 2000 characters)"
				placeholder=""
				type="text"
			/>
			<InputField
				form={formObj}
				field="q5"
				label="Describe a significant challenge you’ve faced. How did you handle it, and what did you learn from the experience? (Max. 2000 characters)"
				placeholder=""
				type="text"
			/>

			<input type="submit" class="btn variant-filled" value="Save Application" />
		</form>
	{/if}
</main>
