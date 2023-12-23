<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="container mx-auto p-8 space-y-8">
	<section>
		<h1 class="h1">{data.event.name}</h1>
		<h3 class="h3">{data.event.description}</h3>
		<p class="font-bold">Start time: {data.event.start_time.toDateString()}</p>
		<p class="font-bold">End time: {data.event.end_time.toDateString()}</p>
		<p class="font-bold">Multiper: {data.event.multiplier}</p>
		<p class="font-bold">Is out of school: {data.event.is_out_of_school}</p>
	</section>
</main>
