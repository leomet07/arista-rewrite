<script lang="ts">
	import type { PageData } from "./$types";
	import { enhance } from "$app/forms";
	import { isOnCommittee } from "$lib/isOnCommittee";
	import { currentUser } from "$lib/pocketbase";
	import { determinteEventCredits } from "$lib/determinteCredits";
	import { format } from "date-fns";
	import { invalidateAll } from "$app/navigation";

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
</script>

<main class="container mx-auto p-8 space-y-8">
	<section>
		<h1 class="h1">{data.event.name}</h1>
		<h3 class="h3">{data.event.description}</h3>
		<p>Located at: {data.event.location}</p>
		<p class="">
			{format(data.event.start_time, "MM/dd/yyyy hh:mm a")} to {format(
				data.event.end_time,
				"MM/dd/yyyy hh:mm a"
			)}
		</p>
		<div class="mt-3">
			<p>Worth {determinteEventCredits(data.event)} credits</p>
			<p>Multiper: {data.event.multiplier}</p>
			<p>{data.event.signed_up.length} people are currently signed up.</p>
			<p>Is out of school: {data.event.is_out_of_school}</p>
			<p>Is complete?: {data.event.isComplete}</p>
		</div>
		{#if data.is_current_user_signed_up}
			<h3 class="h3">You are signed up for this event.</h3>
			<form method="POST" action="?/event_unsign_up" use:enhance>
				<button type="submit" class="btn variant-outline-secondary">Leave event</button>
			</form>
		{:else}
			<form method="POST" action="?/event_sign_up" use:enhance>
				<button type="submit" class="btn variant-filled-secondary">Sign up</button>
			</form>
		{/if}

		{#if isOnCommittee($currentUser, "events") && !data.event.isComplete}
			<div class="card p-4 w-full text-token space-y-4 mt-4">
				<hgroup>
					<h3 class="h3">For Events Committee:</h3>
					<p>
						This event should give <span class="font-bold underline">
							{determinteEventCredits(data.event)} credits
						</span>, barring any commutes or latenesses.
					</p>
				</hgroup>
				{#if data.event.expand}
					{#each data.event.expand.signed_up as signed_up_user}
						<div class="card p-4">
							<p><b>{signed_up_user.name}</b></p>
							<p>{signed_up_user.osis}</p>
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
		{/if}
	</section>
</main>
