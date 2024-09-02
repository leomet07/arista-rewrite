<script lang="ts">
	import { enhance } from "$app/forms";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";
	import type { RecievedTutoringRequest } from "$lib/db_types";
	import { currentUser } from "$lib/pocketbase";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms";

	export let data: PageData;
	let myTutoringRequests: RecievedTutoringRequest[];
	$: myTutoringRequests = data.tutoringRequests.filter((v) => v.tutee == $currentUser?.id);

	const formObj = superForm(data.form, { resetForm: true });
	const { form, errors, constraints } = formObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Tutoring</h1>

	<section>
		<h3 class="h3">Active sessions</h3>
		{#if data.tutoringSessions.length == 0}
			<p>You have no active tutoring sessions at this time.</p>
		{:else}
			{#if !$currentUser?.is_tutee}
				<p>Please contact the tutee of your session(s) if you haven't done so already.</p>
			{:else}
				<p>
					Please contact the tutor of your session(s) if they haven't reached out to you already.
				</p>
			{/if}
			<div class="grid gap-4 xl:grid-cols-3 md:grid-cols-2 mt-4">
				{#each data.tutoringSessions as tutoringSession}
					<div class="card p-4">
						{#if $currentUser?.is_tutee}
							<h3 class="h3">
								Tutor: {tutoringSession.tutor_name}
							</h3>
							<p>Tutor email: {tutoringSession.tutor_email}</p>
						{:else}
							<h3 class="h3">
								Tutee: {tutoringSession.tutee_name}
							</h3>
							<p>Tutee email: {tutoringSession.tutee_email}</p>
						{/if}
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
			</div>
		{/if}
	</section>

	{#if $currentUser?.is_tutee}
		<form
			method="POST"
			class="card p-4 w-full text-token space-y-4"
			action="?/request_tutoring"
			use:enhance
		>
			<ErrorComponent errors={$errors} />

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
		<section>
			<h3 class="h3">Your tutoring requests</h3>
			{#if myTutoringRequests.length > 0}
				<div class="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
					{#each myTutoringRequests as tutoringRequest}
						<div class="card p-4">
							<h3 class="h3">{tutoringRequest.class}</h3>
							<p class="font-bold">{tutoringRequest.topic}</p>
							<p>{tutoringRequest.teacher}</p>
							<p>{tutoringRequest.general_time}</p>
							<p>Is Claimed? {tutoringRequest.isClaimed}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p>You currently have no tutoring requests.</p>
			{/if}
		</section>
	{:else}
		<!-- Tutor View -->
		<section>
			<h3 class="h3">Current requests by tutees:</h3>
			{#if data.tutoringRequests.length == 0}
				<p>There are no tutoring requests at this time!</p>
			{/if}
			<div class="grid gap-4 xl:grid-cols-3 md:grid-cols-2 mt-4">
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
			</div>
		</section>
	{/if}
</main>
