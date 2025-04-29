<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import { calculateCredits, calculateRequiredCredits } from "$lib/calculateCredits";
	import type { ExpandedCredit, RecievedCredit, CommitteesSchema, OpenUser } from "$lib/db_types";
	import { currentUser } from "$lib/pocketbase";
	import { TreeView, TreeViewItem } from "@skeletonlabs/skeleton";
	import { format } from "date-fns";

	export let credits: ExpandedCredit[];
	export let user: OpenUser;
	export let type: RecievedCredit["type"];
</script>

<section class="mb-4">
	<div class="card p-4 w-full flex items-center justify-between gap-5 flex-shrink-0">
		<span class="font-bold w-16">{type}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
		<ProgressBar
			label={`${type} Credits Bar`}
			value={calculateCredits(credits, type)}
			max={calculateRequiredCredits(user, type)}
		/>
		<p class="text-right w-fit whitespace-nowrap">
			{calculateCredits(credits, type)} / {calculateRequiredCredits(user, type)}
		</p>
	</div>

	<div class="mt-1">
		<TreeView>
			<TreeViewItem>
				View all {type} credits
				<svelte:fragment slot="children">
					{#each credits.filter((v) => v.type == type) as credit}
						<div class="variant-filled-tertiary m-4 p-4 rounded">
							{#if credit.manualExplanation && credit.manualExplanation.length > 0}
								<p class="font-bold">{credit.manualExplanation}</p>
							{:else}
								{#if credit.type == "event"}
									<p class="font-bold">{credit.expand?.event?.name}</p>
									<p class="font-bold">
										{format(credit.expand?.event?.start_time || new Date(), "MM/dd/yyyy hh:mm a")} to
										{format(credit.expand?.event?.end_time || new Date(), "MM/dd/yyyy hh:mm a")}
									</p>
								{/if}
								{#if credit.type == "tutoring"}
									<p class="font-bold">
										{credit.expand?.session?.expand.tutoringRequest.topic} for {credit.expand
											?.session?.expand.tutoringRequest.class}
									</p>
									<p>
										Tutoring request completed on {format(
											credit.expand?.session?.dateCompleted || new Date(),
											"MM/dd/yyyy hh:mm a"
										)}
									</p>
									<p>
										Duration in hours: {credit.expand?.session?.durationInHours}
									</p>
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
