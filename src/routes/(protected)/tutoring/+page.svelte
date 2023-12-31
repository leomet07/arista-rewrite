<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";
	import type { RecievedTutoringRequest } from "$lib/db_types";
	import { currentUser } from "$lib/pocketbase";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";

	export let data: PageData;
	let myTutoringRequests: RecievedTutoringRequest[];
	$: myTutoringRequests = data.tutoringRequests.filter((v) => v.tutee == $currentUser?.id);

	const formObj = superForm(data.form, { resetForm: true });
	const { form, errors, constraints } = formObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Tutoring</h1>
	{#if $currentUser?.is_tutee}
		<form
			method="POST"
			class="card p-4 w-full text-token space-y-4"
			action="?/request_tutoring"
			use:enhance
		>
			<ErrorComponent errors={$errors._errors} />

			<h3 class="h3">Request tutoring</h3>

			<InputField
				form={formObj}
				field="class"
				label="What class do you need help with?"
				placeholder="Geometry, Foundation of Lit., Intro to CS..."
			/>
			<InputField
				form={formObj}
				field="teacher"
				label="Who teaches your period?"
				placeholder="Mr. Doe, Ms. Smith, Mr. Yu..."
			/>
			<InputField
				form={formObj}
				field="topic"
				label="What do you need help with?"
				placeholder="AP Unit 7, Vocabulary practice, Racket homework..."
			/>
			<InputField
				form={formObj}
				field="general_time"
				label="What time(s) are you generally free?"
				placeholder="After school on Tuesdays, Period 6, Sundays..."
			/>
			<button type="submit" class="btn variant-filled">Request Tutoring</button>
		</form>
		<h3 class="h3">Your tutoring requests</h3>
		{#if myTutoringRequests.length > 0}
			<section class="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
				{#each myTutoringRequests as tutoringRequest}
					<div class="card p-4">
						<h3 class="h3">{tutoringRequest.class}</h3>
						<p class="font-bold">{tutoringRequest.topic}</p>
						<p>{tutoringRequest.teacher}</p>
						<p>{tutoringRequest.general_time}</p>
						<p>Is Claimed? {tutoringRequest.isClaimed}</p>
					</div>
				{/each}
			</section>
		{:else}
			<p>You currently have no tutoring requests.</p>
		{/if}
	{:else}
		<!-- Tutor View -->
		<h3 class="h3">Current sessions:</h3>
		<section class="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
			{#each data.tutoringSessions as tutoringSession}
				<div class="card p-4">
					<h3 class="h3">
						Tutee: {tutoringSession.tutee_name}
					</h3>
					<p>Tutee email: {tutoringSession.tutee_email}</p>
					<p class="font-bold">
						Class: {tutoringSession.expand.tutoringRequest.class}
					</p>
					<p>
						{tutoringSession.expand.tutoringRequest.topic} with
						{tutoringSession.expand.tutoringRequest.teacher}
					</p>
					<p>{tutoringSession.expand.tutoringRequest.general_time}</p>
				</div>
			{/each}
		</section>

		<h3 class="h3">Current requests by tutees:</h3>
		<section class="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
			{#each data.tutoringRequests as tutoringRequest}
				<div class="card p-4">
					<h3 class="h3">{tutoringRequest.class}</h3>
					<p class="font-bold">{tutoringRequest.topic}</p>
					<p>{tutoringRequest.teacher}</p>
					<p>{tutoringRequest.general_time}</p>
					<form
						method="POST"
						action={"?/claim_tutoring_request&id=" + tutoringRequest.id}
						use:enhance
					>
						<button type="submit" class="mt-2 btn variant-filled">Claim Request</button>
					</form>
				</div>
			{/each}
		</section>
	{/if}
</main>
