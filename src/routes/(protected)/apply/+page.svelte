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
		<p>Welcome to the ARISTA application. Applications are due Sunday, April 19th at 11:59PM EST.</p>
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
			<form
				bind:this={formEl}
				method="POST"
				action="?/save_application"
				class="w-full text-token space-y-4"
				use:enhance
			>
				<TextArea form={formObj} field="q1" placeholder="">
					<p>Identify the 3 most impactful ECs and your weekly commitment to them.</p>
				</TextArea>

				<div>
					<TextArea form={formObj} field="q2" placeholder="">
						<p>
							What is a social issue you care deeply about? How have you been impacted and engaged with it? (250 words maximum)
						</p>
					</TextArea>
				</div>

				<div>
					<TextArea form={formObj} field="q3" placeholder="">
						<p>
							The four pillars of ARISTA are: scholarship, leadership, service,and  character. In 25 words or less, identify a moment in your life where you have each pillar. (100 words maximum)
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
