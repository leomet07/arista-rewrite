<script lang="ts">
	import FAQ from "$lib/components/FAQ.svelte";
	import TutorFAQ from "$lib/components/TutorFAQ.svelte";
	import { currentUser } from "$lib/pocketbase";
	import { get } from "svelte/store";
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1 text-center">Frequently Asked Questions</h1>
	{#if $currentUser && !$currentUser.is_tutee}
		<TutorFAQ />
	{:else}
		<FAQ />
	{/if}
</main> 