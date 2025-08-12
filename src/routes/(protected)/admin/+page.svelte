<script lang="ts">
	import { calculateCredits, calculateRequiredCredits } from "$lib/calculateCredits";
	import calculateTotalStrikeWeight from "$lib/calculateTotalStrikeWeight";
	import MassCreditor from "$lib/components/MassCreditor.svelte";
	import type { PageData } from "./$types";
	import { Paginator } from "@skeletonlabs/skeleton";
	import type { PaginationSettings } from "@skeletonlabs/skeleton";
	import { superForm } from "sveltekit-superforms";

	export let data: PageData;

	// Filter states
	let showOnlyTutors = false;
	let showOnlyInsufficientHours = false;
	let showOnlyGraduating2025OrLater = false;

	// Filtered users based on current filter settings
	$: filteredUsers = data.users?.filter(user => {
		// Filter for tutors only (non-tutees)
		if (showOnlyTutors && user.is_tutee) {
			return false;
		}
		
		// Filter for insufficient hours
		if (showOnlyInsufficientHours) {
			let hasInsufficientHours = false;
			
			// For tutors, check against required credits
			if (!user.is_tutee) {
				const eventCredits = calculateCredits(user.credits, "event");
				const tutoringCredits = calculateCredits(user.credits, "tutoring");
				const otherCredits = calculateCredits(user.credits, "other");
				
				const requiredEventCredits = calculateRequiredCredits(user, "event");
				const requiredTutoringCredits = calculateRequiredCredits(user, "tutoring");
				const requiredOtherCredits = calculateRequiredCredits(user, "other");
				
				hasInsufficientHours = eventCredits < requiredEventCredits || 
										tutoringCredits < requiredTutoringCredits || 
										otherCredits < requiredOtherCredits;
			}
			// For tutees, they don't have required credits, so show them if they have any credits
			else {
				const totalCredits = calculateCredits(user.credits, "event") + 
									calculateCredits(user.credits, "tutoring") + 
									calculateCredits(user.credits, "other");
				hasInsufficientHours = totalCredits > 0; // Show tutees who have earned some credits
			}
			
			if (!hasInsufficientHours) {
				return false;
			}
		}
		
		// Filter for graduation year 2025 or earlier
		if (showOnlyGraduating2025OrLater && user.graduationYear <= 2025) {
			return false;
		}
		
		return true;
	}) || [];

	// Pagination settings - only update size reactively, preserve page state
	let paginationSettings = {
		page: 0,
		limit: 25,
		size: 0,
		amounts: [25, 50, 100, 150, 500, 1000]
	} satisfies PaginationSettings;

	// Update size when filtered users change, but preserve page state
	$: if (filteredUsers) {
		paginationSettings.size = filteredUsers.length;
		// Reset to page 0 if current page would be out of bounds
		if (paginationSettings.page * paginationSettings.limit >= filteredUsers.length) {
			paginationSettings.page = 0;
		}
	}

	$: paginatedUsers = filteredUsers?.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	) || [];

	const MassCreditFormObj = superForm(data.mass_credit_form, { resetForm: false });
	const { errors: MassCreditFormErrors } = MassCreditFormObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Admin Panel</h1>
		<p>Members with is_tutee of FALSE are ARISTA members.</p>
		<p>Members with is_tutee of TRUE are NOT ARISTA members.</p>
		<p>Click on a user's name to view more information and strike them.</p>
	</hgroup>

	<!-- Filter Controls -->
	<div class="card p-4 space-y-4">
		<h3 class="h3">Filters</h3>
		<div class="flex flex-wrap gap-4">
			<label class="flex items-center space-x-2">
				<input type="checkbox" bind:checked={showOnlyTutors} class="checkbox" />
				<span>Show only tutors (ARISTA members)</span>
			</label>
			<label class="flex items-center space-x-2">
				<input type="checkbox" bind:checked={showOnlyInsufficientHours} class="checkbox" />
				<span>Show only users with insufficient hours</span>
			</label>
			<label class="flex items-center space-x-2">
				<input type="checkbox" bind:checked={showOnlyGraduating2025OrLater} class="checkbox" />
				<span>Show only graduating after 2025</span>
			</label>
		</div>
		<p class="text-sm text-token-500">
			Showing {filteredUsers.length} of {data.users.length} users
		</p>
	</div>

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

	<MassCreditor form={MassCreditFormObj} />
</main>
