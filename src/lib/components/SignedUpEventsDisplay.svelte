<script lang="ts">
	import { calculateCredits, calculateRequiredCredits } from "$lib/calculateCredits";
	import type { RecievedEvent } from "$lib/db_types";
	import { format } from "date-fns";

	export let signed_up_events: RecievedEvent[];
</script>

<section class="card p-4 w-full text-token space-y-4">
	<hgroup>
		<h3 class="h3">Your Upcoming Events</h3>
		<p>Click an event to view more.</p>
	</hgroup>
	{#each signed_up_events as event, index}
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
