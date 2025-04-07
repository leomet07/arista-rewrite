<script lang="ts">
	import type { PageData } from "./$types";
	import { currentUser } from "$lib/pocketbase";
	import StrikesDisplay from "$lib/components/StrikesDisplay.svelte";
	import CreditsDisplay from "$lib/components/CreditsDisplay.svelte";
	import SignedUpEventsDisplay from "$lib/components/SignedUpEventsDisplay.svelte";
	import FAQ from "$lib/components/FAQ.svelte";

	export let data: PageData;
</script>

<main class="container mx-auto p-4 space-y-8">
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

			{#if data.credits !== undefined}
				<CreditsDisplay credits={data.credits} user={$currentUser} />
			{/if}
			{#if data.signed_up_events !== undefined}
				<SignedUpEventsDisplay signed_up_events={data.signed_up_events} />
			{/if}
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
	<FAQ />
</main>
