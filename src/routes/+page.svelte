<script lang="ts">
	import type { PageData } from "./$types";
	import { currentUser } from "$lib/pocketbase";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import type { RecievedCredit } from "$lib/db_types";

	export let data: PageData;

	let eventsCreditsNeeded = 21;
	let tutoringCreditsNeeded = 7;
	function calculateCredits(credits: RecievedCredit[], type: "events" | "tutoring"): number {
		let total = 0;
		for (const credit of credits) {
			if ((type == "events" && credit.event) || (type == "tutoring" && credit?.tutoringSession)) {
				total += credit.credits;
			}
		}
		return total;
	}
</script>

<main class="container mx-auto p-8 space-y-8">
	{#if $currentUser}
		<hgroup>
			<h1 class="h1">Your credits.</h1>
			<p class="h5">View your progress and the ARISTA service requirements here.</p>
		</hgroup>

		<section>
			{#if data.credits}
				<div class="card p-4 w-full flex items-center justify-between gap-5 flex-shrink-0">
					<span class="font-bold">Events</span>
					<ProgressBar
						label="Events Credits Bar"
						value={calculateCredits(data.credits, "events")}
						max={eventsCreditsNeeded}
					/>
					<p class="text-right w-fit whitespace-nowrap">
						{calculateCredits(data.credits, "events")} / {eventsCreditsNeeded}
					</p>
				</div>
				<div class="mt-3 card p-4 w-full flex items-center justify-between gap-5 flex-shrink-0">
					<span class="font-bold">Tutoring</span>
					<ProgressBar
						label="Tutoring Credits Bar"
						value={calculateCredits(data.credits, "tutoring")}
						max={eventsCreditsNeeded}
					/>
					<p class="text-right w-fit whitespace-nowrap">
						{calculateCredits(data.credits, "tutoring")} / {tutoringCreditsNeeded}
					</p>
				</div>
			{/if}
		</section>
	{:else}
		<h3 class="h3">
			You aren't logged in.
			<a class="anchor" href="/login">Login please.</a>
		</h3>
	{/if}
</main>
