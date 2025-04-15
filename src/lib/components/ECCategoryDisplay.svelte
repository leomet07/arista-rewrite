<script lang="ts">
	import { extracurriculars } from "$lib/components/ECSelectorStore";
	import type { ExtraCurricular } from "$lib/db_types";
	export let formattedName: string;
	export let category: ExtraCurricular["category"];
</script>

<div class="card p-4">
	<h3 class="h3">Your {formattedName}</h3>
	{#if $extracurriculars}
		<div class="grid gap-4 xl:grid-cols-3 md:grid-cols-2 mt-4">
			{#each $extracurriculars as ec, index}
				{#if ec.category == category}
					<div class="card p-4">
						<h4 class="h4">Organization: {ec.organization}</h4>
						<p>Position: {ec.position}</p>
						<p>Description: {ec.description}</p>
						<p>{ec.hoursPerWeek} hours per week; {ec.weeksPerYear} weeks per year.</p>
						<p>Faculty Advisor: {ec.advisorName}</p>
						<p>Faculty Advisor Contact: {ec.advisorContact}</p>
						<button
							type="button"
							class="btn variant-filled-tertiary"
							on:click={() => {
								// remove this entry when this button is clicked
								if (!$extracurriculars) {
									return;
								}
								$extracurriculars = $extracurriculars
									.slice(0, index)
									.concat($extracurriculars.slice(index + 1, $extracurriculars.length));
							}}
						>
							Delete this Entry
						</button>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	{#if !$extracurriculars || $extracurriculars?.filter((v) => v.category == category).length == 0}
		<p>You have not added any {formattedName.toLowerCase()}.</p>
	{/if}
</div>
