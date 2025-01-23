<script lang="ts">
	import calculateTotalStrikeWeight from "$lib/calculateTotalStrikeWeight";
	import type { RecievedStrike } from "$lib/db_types";

	export let strikes: RecievedStrike[];
</script>

<section class="card p-4 w-full text-token space-y-4">
	<h3 class="h3">
		Total Strikes: {Math.round((calculateTotalStrikeWeight(strikes) + Number.EPSILON) * 100) / 100}
	</h3>

	{#each strikes as strike, index}
		<div class="card p-4 w-full">
			<h3>Strike weight: {strike.weight}</h3>
			<p>Reason: {strike.reason}</p>
		</div>
	{/each}
</section>
