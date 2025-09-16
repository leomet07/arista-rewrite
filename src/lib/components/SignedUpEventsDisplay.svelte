<script lang="ts">
	import { calculateCredits, calculateRequiredCredits } from "$lib/calculateCredits";
	import type { RecievedEvent } from "$lib/db_types";
	import { format, startOfDay } from "date-fns";

	export let signed_up_events: RecievedEvent[];

	// Filter events to only show those with start_time in the future or same day
	$: filtered_events = signed_up_events.filter(event => {
		const eventStartTime = new Date(event.start_time);
		const today = startOfDay(new Date());
		const eventStartDate = startOfDay(eventStartTime);
		
		// Show events that start today or in the future
		return eventStartDate >= today;
	});
</script>

<section class="card p-4 w-full text-token space-y-4">
	<hgroup>
		<h3 class="h3">Your Upcoming Events</h3>
		<p>Click an event to view more.</p>
	</hgroup>
	{#each filtered_events as event}
		<div class="card p-4 w-full">
			<a class="underline" href={"/events/view/" + event.id}><h3>{event.name}</h3></a>
			<p>Located at: {event.location}</p>
			<p class="">
				{format(event.start_time, "MM/dd/yyyy hh:mm a")} to {format(
					event.end_time,
					"MM/dd/yyyy hh:mm a"
				)}
			</p>
		</div>
	{/each}
</section>
