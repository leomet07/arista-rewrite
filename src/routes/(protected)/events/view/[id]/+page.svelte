<script lang="ts">
	import type { PageData } from "./$types";
	import { enhance, deserialize, applyAction } from "$app/forms";
	import { isOnCommittee } from "$lib/isOnCommittee";
	import { currentUser } from "$lib/pocketbase";
	import { determinteEventCredits } from "$lib/determinteCredits";
	import { format } from "date-fns";
	import { invalidateAll } from "$app/navigation";
	import { superForm } from "sveltekit-superforms";
	import EventEditor from "$lib/components/EventEditor.svelte";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { ActionResult } from "@sveltejs/kit";

	import { type ModalSettings } from "@skeletonlabs/skeleton";

	const modalStore = getModalStore();
	export let data: PageData;

	async function giveCredits(event: Event, user_id: string) {
		const formEl = event.target as HTMLFormElement;
		const data = new FormData(formEl);

		const response = await fetch(formEl.action, {
			method: "POST",
			body: JSON.stringify({
				user_id: user_id,
				credits: data.get("credits")
			})
		});
		const responseData = await response.json();

		// { success: true, errors: {} } object

		// reset form
		formEl.reset();

		// rerun `load` function for the page
		await invalidateAll();
	}

	const formObj = superForm(data.update_form, {
		invalidateAll: "force",
		resetForm: false
	});

	async function handleDeleteEvent(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		const confirmDelete: ModalSettings = {
			type: "confirm",
			title: "Delete event",
			body: "Are you sure you want to delete the event?",
			response: async (r: boolean) => {
				if (r) {
					const fdata = new FormData();
					console.log("Deleting event", event.currentTarget);
					// @ts-ignore
					const response = await fetch(`/events/view/${data.event.id}?/delete_event`, {
						method: "POST",
						body: fdata
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
		modalStore.trigger(confirmDelete);
	}
</script>

<main class="container mx-auto p-8 space-y-8">
	<section>
		<h1 class="h1">{data.event.name}</h1>
		<p class=" font-normal mt-2">{data.event.description}</p>
		{#if data.event.isComplete}
			<br>
			<aside class="alert variant-filled-success mt-2 mb-4"><b>This event is already complete.</b></aside>
		{/if}
		<br>
		<p><b>Located at:</b> {data.event.location}</p>
		<p class="">
			<b>Scheduled Time:</b> {format(data.event.start_time, "MM/dd/yyyy hh:mm a")} to {format(
				data.event.end_time,
				"MM/dd/yyyy hh:mm a"
			)}
		</p>
		<div class="mt-3">
			<p>
				Worth {determinteEventCredits(data.event)} {determinteEventCredits(data.event) === 1 ? "credit" : "credits"}, after applying a multiplier of
				{data.event.multiplier}x.
			</p>
			<p>
				{data.event.signed_up.length} 
				{data.event.signed_up.length === 1 ? "person is" : "people are"} currently signed up.
			</p>
			<p>This event is {data.event.is_out_of_school ? "" : "not"} out of school.</p>
		</div>
		<br>
		{#if !data.event.isComplete}
			{#if data.is_current_user_signed_up}
				<h3 class="h3">You are signed up for this event.</h3>
				<br>
				<form method="POST" action="?/event_unsign_up" use:enhance>
					<button type="submit" class="btn variant-outline-secondary">Leave Event</button>
				</form>
			{:else}
				<form method="POST" action="?/event_sign_up" use:enhance>
					<button type="submit" class="btn variant-filled-secondary">Sign Up</button>
				</form>
			{/if}
		{/if}

		{#if isOnCommittee($currentUser, "events") && !data.event.isComplete}
			<div class="card p-4 w-full text-token space-y-4 mt-4">
				<hgroup>
					<h3 class="h3">For Events Committee:</h3>
					<p>
						This event should give
						<span class="font-bold underline"> {determinteEventCredits(data.event) === 1 ? "credit" : "credits"}</span>,
						barring any commutes or latenesses.
					</p>
				</hgroup>
				{#if data.event.expand}
					{#each data.event.expand.signed_up as signed_up_user}
						<div class="card p-4">
							<p><b>{signed_up_user.name}</b></p>
							<p>{signed_up_user.email}</p>
							{#if data.credited_user_ids.includes(signed_up_user.id)}
								<p>This user has already been credited.</p>
							{:else}
								<form
									class="flex items-end"
									on:submit|preventDefault={(e) => giveCredits(e, signed_up_user.id)}
									method="POST"
									action="?/giveCreditToUser"
								>
									<label for="credits">
										Enter the # of credits:
										<input
											class="input p-2"
											name="credits"
											type="numeric"
											value={determinteEventCredits(data.event)}
										/>
									</label>
									<button type="submit" class="btn variant-outline-tertiary h-fit">Credit</button>
								</form>
							{/if}
						</div>
					{/each}
				{/if}
				<form class="mt-3" method="POST" action="?/mark_event_as_completed" use:enhance>
					<button type="submit" class="btn variant-filled-secondary">
						Mark event as completed
					</button>
				</form>
			</div>

			<form method="POST" action="?/update_event" class="card mt-4 p-4 w-full text-token space-y-4">
				<EventEditor {formObj} promptText="Update" />
			</form>
			{#if $currentUser?.id === data.event.event_owner || isOnCommittee($currentUser, "admin")}
				<form
					class="mt-4"
					method="POST"
					on:submit|preventDefault={handleDeleteEvent}
					action="?/delete_event"
				>
					<button type="submit" class="btn variant-filled-error">Delete Event</button>
				</form>
			{/if}
		{/if}
	</section>
</main>

<style>

	h1, h3, p{
		text-align: center;
	}
	
	button {
    	margin:0 auto;
    	display:block;
		padding: 32px 16px;
		border-radius: 25%;
	}


</style>