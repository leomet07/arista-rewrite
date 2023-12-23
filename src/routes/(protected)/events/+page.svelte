<script lang="ts">
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import { currentUser } from "$lib/pocketbase";

	export let data: PageData;
	// const { form, errors, constraints } = superForm(data.form);
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Events</h1>
	<h2 class="h2">Upcoming events:</h2>
	<section class="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
		{#each data.events as item}
			<div class="card p-4">
				<h3 class="h3">{item.name}</h3>
				<p class="font-bold">{item.start_time.toDateString()}</p>
				{#if item.description}
					<p>{item.description}</p>
				{/if}
			</div>
		{/each}
	</section>
</main>
