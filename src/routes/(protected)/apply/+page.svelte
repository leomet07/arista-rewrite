<script lang="ts">
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { superForm } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import { type ModalSettings } from "@skeletonlabs/skeleton";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { ActionResult } from "@sveltejs/kit";
	import { invalidateAll } from "$app/navigation";

	const modalStore = getModalStore();

	export let data: PageData;
	const formObj = superForm(data.form);
	const { form, errors, constraints } = formObj;

	let formEl: HTMLFormElement;

	async function handleSubmitApplication() {
		const confirmDelete: ModalSettings = {
			type: "confirm",
			title: "Submit Application",
			body: "Are you sure you want to submit your ARISTA application? The application cannot be edited after submission.",
			response: async (r: boolean) => {
				console.log("Here");
				if (r) {
					const data = new FormData(formEl);
					// @ts-ignore
					const response = await fetch("/apply?/submit_application", {
						method: "POST",
						body: data
					});

					const result: ActionResult = deserialize(await response.text());

					if (result.type === "success") {
						// rerun all `load` functions, following the successful update
						await invalidateAll();
					}
					applyAction(result);
				}
			}
		};
		setTimeout(() => {
			modalStore.trigger(confirmDelete);
		}, 2);
	}
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
		<div class="card p-4">
			<form
				bind:this={formEl}
				method="POST"
				action="?/save_application"
				class="w-full text-token space-y-4"
			>
				<TextArea
					form={formObj}
					field="q1"
					label="Why do you want to be a member of ARISTA?"
					placeholder=""
				/>
				<TextArea
					form={formObj}
					field="q2"
					label="Describe a way that you are involved in your community (your neighborhood, NYC, Stuyvesant, etc.) that has been meaningful to you. What did you learn from the experience?"
					placeholder=""
				/>
				<TextArea
					form={formObj}
					field="q3"
					label="If you have not previously been engaged in your community, what impact would you like to have in the future? And how do you hope ARISTA will help those endeavors?"
					placeholder=""
				/>
				<TextArea
					form={formObj}
					field="q4"
					label="Choose a quote that resonates with you. Explain how it demonstrates your values, beliefs, or experiences in the world. Feel free to explore your creativity in answering this."
					placeholder=""
				/>
				<TextArea
					form={formObj}
					field="q5"
					label="Describe a significant challenge you’ve faced. How did you handle it, and what did you learn from the experience?"
					placeholder=""
				/>

				<input type="submit" class="btn variant-filled" value="Save Application" />
			</form>
			<form class="mt-4" method="POST" on:submit|preventDefault={handleSubmitApplication}>
				<button type="submit" class="btn variant-filled-success">Submit Application</button>
			</form>
		</div>
	{/if}
</main>
