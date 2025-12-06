<script lang="ts">
	import { enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";
	import type { RecievedTutoringRequest } from "$lib/db_types";
	import { currentUser } from "$lib/pocketbase";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms";

	export let data: PageData;
	let myTutoringRequests: RecievedTutoringRequest[];
	$: myTutoringRequests = data.tutoringRequests.filter((v) => v.tutee == $currentUser?.id);

	let selectedSubject = "All";

	// Separate requests into priority (2+ days old) and recent
	let priorityRequests: RecievedTutoringRequest[];
	let recentRequests: RecievedTutoringRequest[];


	$:{
		const twoDaysAgo = new Date();
		twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
		
		priorityRequests = data.tutoringRequests.filter(request => 
			new Date(request.created) <= twoDaysAgo &&
			(selectedSubject === "All" || request.subject === selectedSubject)
		);
		recentRequests = data.tutoringRequests.filter(request => 
			new Date(request.created) > twoDaysAgo && 
			(selectedSubject === "All" || request.subject === selectedSubject)
		)
	
		;
	}

	async function finishTutoringSession(event: Event) {
		const formEl = event.target as HTMLFormElement;
		const data = new FormData(formEl);

		const response = await fetch(formEl.action, {
			method: "POST",
			body: JSON.stringify({
				duration: data.get("duration")
			})
		});
		const responseData = await response.json(); // { success: true, errors: {} } object

		formEl.reset(); // reset form
		await invalidateAll(); // rerun `load` function for the page
	}

	const requestTutoringFormObj = superForm(data.requestTutoringForm, { resetForm: true });
	const { errors: requestTutoringFormErrors } = requestTutoringFormObj;
	const finishTutoringFormObj = superForm(data.finishTutoringSessionForm, { resetForm: true });
	const { errors: finishTutoringFormErrors } = finishTutoringFormObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Tutoring</h1>

	{#if !$currentUser?.is_tutee}
		<!-- Tutoring Tips PDF Link - Only for Tutors -->
		<div class="card p-4 bg-primary-50-900-token">
			<h3 class="h3 mb-2">Tutoring Tips & Instructions</h3>
			<p class="mb-3">New to tutoring? Check out our guide for tips and best practices.</p>
			<a 
				href="/Tutoring-Tips-and-Tricks-Guide.pdf" 
				target="_blank" 
				class="btn variant-filled-primary"
			>
				View Tutoring Tips & Tricks Guide (PDF)
			</a>
		</div>
	{/if}

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
							Subject: {tutoringSession.expand.tutoringRequest.subject}
						</p>
						<p class="font-bold">
							Class: {tutoringSession.expand.tutoringRequest.class}
						</p>
						<p>
							{tutoringSession.expand.tutoringRequest.topic} with
							{tutoringSession.expand.tutoringRequest.teacher}
						</p>
						<p>{tutoringSession.expand.tutoringRequest.general_time}</p>
						{#if $currentUser?.is_tutee}
							<form
								method="POST"
								class="mt-2 card p-2"
								action={"?/finish_tutoring_session&id=" + tutoringSession.id}
								use:enhance
							>
								<ErrorComponent errors={$finishTutoringFormErrors} />

								<InputField
									form={finishTutoringFormObj}
									field="durationInHours"
									label="Enter the duration of your session, in hours (ie: 1, 4, 1.5, etc):"
									placeholder="1"
									inputmode="numeric"
								/>

								<button type="submit" class="mt-2 btn variant-filled"
									>Finish Tutoring Session</button
								>
							</form>
						{/if}
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
			<ErrorComponent errors={$requestTutoringFormErrors} />

			<h3 class="h3">Request tutoring</h3>

			<label for="subjectSelect" class="block font-semibold">Subject:</label>
				<select
				id="subjectSelect"
				name="subject"
				class="w-full rounded-lg border border-surface-300 bg-surface-50 text-surface-900 dark:bg-surface-800 dark:text-surface-50 p-2 focus:ring-2 focus:ring-primary-500"
				>
				<option value="" disabled selected>Select a subject</option>
				<option value="Biology & Environmental Science">Biology & Environmental Science</option>
				<option value="Math">Math</option>
				<option value="Foreign Language">Foreign Language</option>
				<option value="Chemistry">Chemistry</option>
				<option value="Physics">Physics</option>
				<option value="Computer Science & Technology">Computer Science & Technology</option>
				<option value="Social Studies">Social Studies</option>
				<option value="English">English</option>
				<option value="Music & Art & Health">Music & Art & Health</option>
				<option value="Others">Others</option>
				</select>

			<InputField
				form={requestTutoringFormObj}
				field="class"
				label="What class do you need help with?"
				placeholder="Geometry, Foundation of Lit., Intro to CS..."
			/>
			<InputField
				form={requestTutoringFormObj}
				field="teacher"
				label="Who teaches your period?"
				placeholder="Mr. Doe, Ms. Smith, Mr. Yu..."
			/>
			<InputField
				form={requestTutoringFormObj}
				field="topic"
				label="What do you need help with?"
				placeholder="AP Unit 7, Vocabulary practice, Racket homework..."
			/>
			<InputField
				form={requestTutoringFormObj}
				field="general_time"
				label="What time(s) are you generally free? (Weekends/ via Zoom are allowed)"
				placeholder="Weekends on Zoom, After school on Tuesdays, Period 6..."
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
							<p class="font-bold">{tutoringRequest.subject}</p>
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

		
		 <label for="subjectFilter" class="font-semibold text-lg">Filter by subject:</label>
				<select
				id="subjectFilter"
    			bind:value={selectedSubject}
				class="w-full rounded-lg border border-surface-300 bg-surface-50 text-surface-900 dark:bg-surface-800 dark:text-surface-50 p-2 focus:ring-2 focus:ring-primary-500"
				>
					<option value="All">All Subjects</option>
					<option value="Biology & Environmental Science">Biology & Environmental Science</option>
					<option value="Chemistry">Chemistry</option>
					<option value="Physics">Physics</option>
					<option value="Math">Math</option>
					<option value="Foreign Language">Foreign Language</option>
					<option value="Social Studies">Social Studies</option>
					<option value="Computer Science & Technology">Computer Science & Technology</option>
					<option value="English">English</option>
					<option value="Music & Art & Health">Music & Art & Health</option>
					<option value="Others">Others</option>
				</select>


		{#if priorityRequests.length > 0}
			<section>
				
				<h3 class="h3 text-warning-500">Priority Requests (2+ days old):</h3>
				<p class="text-warning-700 dark:text-warning-300 mb-4">These requests need urgent attention!</p>
				<div class="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
					{#each [...priorityRequests].reverse() as tutoringRequest}
						<div class="relative card p-4 variant-soft-warning">
							<h3 class="h3">{tutoringRequest.class}</h3>
							<span class="absolute top-2 right-2 border border-surface-400 dark:border-surface-600 text-sm font-semibold px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-800">
								{tutoringRequest.subject}
							</span>
							<p class="font-bold">{tutoringRequest.topic}</p>
							<p>{tutoringRequest.teacher}</p>
							<p>{tutoringRequest.general_time}</p>
							<p class="text-sm text-surface-600 dark:text-surface-400">
								Requested: {new Date(tutoringRequest.created).toLocaleDateString()}
							</p>
							<form
								method="POST"
								action={"?/claim_tutoring_request&id=" + tutoringRequest.id}
								use:enhance
							>
								<button type="submit" class="mt-2 btn variant-filled-warning">Claim Priority Request</button>
							</form>
						</div>
					{/each}
				</div>
			</section>
		{/if}
		
		<section>
			<h3 class="h3">Recent requests by tutees:</h3>
			{#if data.tutoringRequests.length === 0}
				<p>There are no tutoring requests at this time!</p>
			{:else if recentRequests.length === 0 && priorityRequests.length > 0}
				<p>All current requests are in the priority section above.</p>
			{:else if recentRequests.length === 0}
				<p>There are no recent tutoring requests at this time!</p>
			{/if}
			{#if recentRequests.length > 0}
				<div class="grid gap-4 xl:grid-cols-3 md:grid-cols-2 mt-4">
					{#each recentRequests as tutoringRequest}
						<div class="relative card p-4">
							<h3 class="h3">{tutoringRequest.class}</h3>
							<span class="absolute top-2 right-2 border border-surface-400 dark:border-surface-600 text-sm font-semibold px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-800">
								{tutoringRequest.subject}
							</span>
							<p class="font-bold">{tutoringRequest.topic}</p>
							<p>{tutoringRequest.teacher}</p>
							<p>{tutoringRequest.general_time}</p>
							<p class="text-sm text-surface-600 dark:text-surface-400">
								Requested: {new Date(tutoringRequest.created).toLocaleDateString()}
							</p>
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
			{/if}
		</section>
	{/if}
</main>
