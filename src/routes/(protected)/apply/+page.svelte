<script lang="ts">
	import { applyAction, deserialize } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { superForm } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import { type ModalSettings } from "@skeletonlabs/skeleton";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { ActionResult } from "@sveltejs/kit";
	import { invalidateAll } from "$app/navigation";
	import ECSelector from "$lib/components/ECSelector.svelte";
	import { extracurriculars } from "$lib/components/ECSelectorStore";

	const modalStore = getModalStore();

	export let data: PageData;

	const formObj = superForm(data.form, {
		dataType: "json",
		onSubmit({ jsonData }) {
			// Set data to be posted
			jsonData({
				...$form,
				extracurriculars: $extracurriculars
			});
		},
		invalidateAll: "force"
	});
	const { form, errors, constraints, enhance } = formObj;

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
					data.append("extracurriculars", JSON.stringify($extracurriculars));

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

	$extracurriculars = data?.userApplication?.extracurriculars || [];
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Apply to ARISTA</h1>
		<p>Welcome to the ARISTA application. Applications are due Monday, May 5th at 11:59PM EST.</p>
	</hgroup>

	<ErrorComponent errors={$errors} />

	{#if data.userApplication && data.userApplication.submitted}
		<aside class="alert variant-filled-success mb-4">
			<b>
				Thank you for submitting your application to ARISTA. Selected applicants will move forward
				in our application process by being contacted to interview with the executive council.
			</b>
		</aside>
	{:else}
		<div class="card p-4">
			<aside class="alert variant-filled-surface mb-4">
				<b>
					Only current Freshmen, sophomores, and junior Stuyvesant students with a 92 overall GPA
					(no exceptions will be made, not even if you are a tenth off) are eligible to apply.
				</b>
			</aside>
			<hgroup class="mb-4">
				<h3 class="h3">Please fill out the following responses below.</h3>
				<p>
					Speak what you feel, not what you think we want to hear. The provided character limits are
					only maximums, not minimums.
				</p>
			</hgroup>
			<div class="mb-4">
				<ECSelector />
			</div>
			<form
				bind:this={formEl}
				method="POST"
				action="?/save_application"
				class="w-full text-token space-y-4"
				use:enhance
			>
				<TextArea form={formObj} field="q1" placeholder="">
					<p>Why do you want to be a member of ARISTA?</p>
				</TextArea>

				<div>
					<h4 class="h4">
						For question 2, please choose <span class="underline">ONE</span> prompt to answer. Indicate
						which prompt you are answering at the start of your response.
					</h4>
					<TextArea form={formObj} field="q2" placeholder="">
						<p>
							a) Describe a way that you are involved in your community (your neighborhood, NYC,
							Stuyvesant, etc.) that has been meaningful to you. What did you learn from the
							experience?
						</p>
						<span class="font-bold">OR</span>
						<p>
							b) If you have not previously been engaged in your community, what impact would you
							like to have in the future? And how do you hope ARISTA will help those endeavors?
						</p>
					</TextArea>
				</div>

				<div>
					<h4 class="h4">
						For question 3, please choose <span class="underline">ONE</span> prompt to answer. Indicate
						which prompt you are answering at the start of your response.
					</h4>
					<TextArea form={formObj} field="q3" placeholder="">
						<p>
							a) Choose a quote that resonates with you. Explain how it demonstrates your values,
							beliefs, or experiences in the world. Feel free to explore your creativity in
							answering this.
						</p>
						<span class="font-bold">OR</span>
						<p>
							b) Describe a significant challenge you’ve faced. How did you handle it, and what did
							you learn from the experience?
						</p>
					</TextArea>
				</div>

				<input type="submit" class="btn variant-filled" value="Save Application" />
			</form>
			<form class="mt-4" method="POST" on:submit|preventDefault={handleSubmitApplication}>
				<button type="submit" class="btn variant-filled-success">Submit Application</button>
			</form>
		</div>
	{/if}
</main>
