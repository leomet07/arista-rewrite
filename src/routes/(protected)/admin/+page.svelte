<script lang="ts">
	import { calculateCredits, calculateRequiredCredits } from "$lib/calculateCredits";
	import calculateTotalStrikeWeight from "$lib/calculateTotalStrikeWeight";
	import { determinteEventCredits } from "$lib/determinteCredits";
	import type { PageData } from "./$types";
	import { Paginator } from "@skeletonlabs/skeleton";
	import type { PaginationSettings } from "@skeletonlabs/skeleton";
	export let data: PageData;

	let paginationSettings = {
		page: 0,
		limit: 25,
		size: data.users.length,
		amounts: [25, 50, 100, 150, 500, 1000]
	} satisfies PaginationSettings;

	$: paginatedUsers = data.users.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Admin Panel</h1>
		<p>Members with is_tutee of FALSE are ARISTA members.</p>
		<p>Members with is_tutee of TRUE are NOT ARISTA members.</p>
		<p>Click on a user's name to view more information and strike them.</p>
	</hgroup>

	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Is-Tutee</th>
					<th>Events Credits</th>
					<th>Tutoring Credits</th>
					<th>Other Credits</th>
					<th>Total Strike Weight</th>
					<th>Committees</th>
					<th>Homeroom</th>
					<th>Graduation Year</th>
					<th>OSIS</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedUsers as row, i}
					<tr>
						<td><a class="underline" href={"/admin/view_user/" + row.id}>{row.name}</a></td>
						<td>{row.email}</td>
						<td>
							{row.is_tutee}
						</td>
						<td>
							{calculateCredits(row.credits, "event")} / {row.is_tutee
								? "NONE"
								: calculateRequiredCredits(row, "event")}
						</td>
						<td>
							{calculateCredits(row.credits, "tutoring")} / {row.is_tutee
								? "NONE"
								: calculateRequiredCredits(row, "tutoring")}
						</td>
						<td>
							{calculateCredits(row.credits, "other")} / {row.is_tutee
								? "NONE"
								: calculateRequiredCredits(row, "other")}
						</td>
						<td>{calculateTotalStrikeWeight(row.strikes)}</td>
						<td>{row.committees.join(", ") || "none"}</td>
						<td>{row.homeroom}</td>
						<td>{row.graduationYear}</td>
						<td>{row.osis}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<Paginator
		bind:settings={paginationSettings}
		showFirstLastButtons={true}
		showPreviousNextButtons={true}
	/>
</main>
