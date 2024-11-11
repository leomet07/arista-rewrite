<script lang="ts">
	import type { PageData } from "./$types";
	import { currentUser } from "$lib/pocketbase";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import calculateCredits from "$lib/calculateCredits";
	import StrikesDisplay from "$lib/components/StrikesDisplay.svelte";

	export let data: PageData;

	let eventsCreditsNeeded = 21;
	let tutoringCreditsNeeded = 3;
	let otherCreditsNeeded = 4;
</script>

<main class="container mx-auto p-8 space-y-8">
	{#if $currentUser}
		{#if $currentUser.is_tutee}
			<hgroup>
				<h1 class="h1">Welcome to ARISTA.</h1>
				<p class="h5">Request academic support and tutoring here.</p>
			</hgroup>
		{:else}
			<hgroup>
				<h1 class="h1">Your credits.</h1>
				<p class="h5">View your progress and the ARISTA service requirements here.</p>
			</hgroup>

			<section>
				{#if data.credits !== undefined}
					<div class="card p-4 w-full flex items-center justify-between gap-5 flex-shrink-0">
						<span class="font-bold w-16">Events&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<ProgressBar
							label="Events Credits Bar"
							value={calculateCredits(data.credits, "event")}
							max={eventsCreditsNeeded}
						/>
						<p class="text-right w-fit whitespace-nowrap">
							{calculateCredits(data.credits, "event")} / {eventsCreditsNeeded}
						</p>
					</div>
					<div class="mt-3 card p-4 w-full flex items-center justify-between gap-5 flex-shrink-0">
						<span class="font-bold w-16">Tutoring</span>
						<ProgressBar
							label="Tutoring Credits Bar"
							value={calculateCredits(data.credits, "tutoring")}
							max={tutoringCredWitsNeeded}
						/>
						<p class="text-right w-fit whitespace-nowrap">
							{calculateCredits(data.credits, "tutoring")} / {tutoringCreditsNeeded}
						</p>
					</div>
					<div class="mt-3 card p-4 w-full flex items-center justify-between gap-5 flex-shrink-0">
						<span class="font-bold w-16">Other</span>
						<ProgressBar
							label="Other Credits Bar"
							value={calculateCredits(data.credits, "other")}
							max={otherCreditsNeeded}
						/>
						<p class="text-right w-fit whitespace-nowrap">
							{calculateCredits(data.credits, "other")} / {otherCreditsNeeded}
						</p>
					</div>
				{/if}
			</section>
			{#if data.strikes !== undefined}
				<StrikesDisplay strikes={data.strikes} />
			{/if}
		{/if}
	{:else}
		<h3 class="h3">
			You aren't logged in.
			<a class="anchor" href="/login">Login please.</a>
		</h3>
	{/if}
</main>
