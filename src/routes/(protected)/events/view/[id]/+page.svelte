<script lang="ts">
	import type { PageData } from "./$types";
	import { enhance } from "$app/forms";
	import { isOnCommittee } from "$lib/isOnCommittee";
	import { currentUser } from "$lib/pocketbase";
	import { determinteEventCredits } from "$lib/determinteCredits";
	import { format } from "date-fns";

	export let data: PageData;
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

		{#if isOnCommittee($currentUser, "events") && !data.event.isComplete}
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

			<form class="mt-3" method="POST" action="?/mark_event_as_completed" use:enhance>
				<p>This will give every participant {determinteEventCredits(data.event)} credits.</p>
				<button type="submit" class="btn variant-filled-secondary">
					Mark event as completed
				</button>
			</form>
		{/if}
	</section>
</main>
