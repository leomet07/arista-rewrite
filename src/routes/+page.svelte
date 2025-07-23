<script lang="ts">
	import type { PageData } from "./$types";
	import { currentUser } from "$lib/pocketbase";
	import StrikesDisplay from "$lib/components/StrikesDisplay.svelte";
	import CreditsDisplay from "$lib/components/CreditsDisplay.svelte";
	import SignedUpEventsDisplay from "$lib/components/SignedUpEventsDisplay.svelte";
	import FAQ from "$lib/components/FAQ.svelte";

	export let data: PageData;
</script>

<main class="container mx-auto p-4 md:p-8 space-y-8">
	{#if $currentUser && !$currentUser.is_tutee}
		<hgroup>
			<h1 class="h1">Hello{$currentUser ? `, ${$currentUser.name}` : ""}! View your credits.</h1>
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
	{:else}
		<hgroup>
			<h1 class="h1">Welcome to ARISTA{$currentUser ? `, ${$currentUser.name}` : ""}.</h1>
			<p class="h3">
				Request academic support through individual tutoring
				<a class="anchor" href="/tutoring">here</a>.
			</p>
		</hgroup>
	{/if}
	{#if !$currentUser}
		<h3 class="h3">
			You aren't logged in.
			<a class="anchor" href="/login">Login</a> or <a class="anchor" href="/register">Register</a>.
		</h3>
	{/if}
</main>
