<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import { calculateCredits, calculateRequiredCredits } from "$lib/calculateCredits";
	import type { RecievedCredit } from "$lib/db_types";
	import { currentUser } from "$lib/pocketbase";
	import { TreeView, TreeViewItem } from "@skeletonlabs/skeleton";

	export let credits: RecievedCredit[];
	export let type: RecievedCredit["type"];
</script>

<section class="mb-4">
	<div class="card p-4 w-full flex items-center justify-between gap-5 flex-shrink-0">
		<span class="font-bold w-16">{type}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
		<ProgressBar
			label={`${type} Credits Bar`}
			value={calculateCredits(credits, type)}
			max={calculateRequiredCredits($currentUser, type)}
		/>
		<p class="text-right w-fit whitespace-nowrap">
			{calculateCredits(credits, type)} / {calculateRequiredCredits($currentUser, type)}
		</p>
	</div>

	<div class="mt-1">
		<TreeView>
			<TreeViewItem>
				View all {type} credits
				<svelte:fragment slot="children">
					{#each credits.filter((v) => v.type == type) as credit}
						<div class="variant-filled-tertiary m-4 p-4 rounded">
							{#if credit.manualExplanation}
								<p class="font-bold">{credit.manualExplanation}</p>
							{:else}
								{#if credit.type == "event"}
									<p class="font-bold">ID: {credit.event}</p>
								{/if}
								{#if credit.type == "tutoring"}
									<p class="font-bold">ID: {credit.session}</p>
								{/if}
							{/if}

							<p>{credit.credits} credits</p>
						</div>
					{/each}
				</svelte:fragment>
			</TreeViewItem>
		</TreeView>
	</div>
</section>
