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
	let searchQuery = "";

	// Filtered users based on current filter settings
	$: filteredUsers = data.users?.filter(user => {
		// Search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			const matchesName = user.name.toLowerCase().includes(query);
			const matchesEmail = user.email.toLowerCase().includes(query);
			
			if (!matchesName && !matchesEmail) {
				return false;
			}
		}
		
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

	// CSV Export functionality
	function exportToCSV() {
		const headers = [
			'Name',
			'Email', 
			'Is-Tutee',
			'Events Credits',
			'Required Events Credits',
			'Tutoring Credits', 
			'Required Tutoring Credits',
			'Other Credits',
			'Required Other Credits',
			'Total Strike Weight',
			'Committees',
			'Homeroom',
			'Graduation Year',
			'OSIS'
		];

		const csvRows = [
			headers.join(','),
			...filteredUsers.map(user => [
				`"${user.name}"`,
				user.email,
				user.is_tutee,
				calculateCredits(user.credits, "event"),
				user.is_tutee ? "N/A" : calculateRequiredCredits(user, "event"),
				calculateCredits(user.credits, "tutoring"),
				user.is_tutee ? "N/A" : calculateRequiredCredits(user, "tutoring"),
				calculateCredits(user.credits, "other"),
				user.is_tutee ? "N/A" : calculateRequiredCredits(user, "other"),
				calculateTotalStrikeWeight(user.strikes),
				`"${user.committees.join(', ') || 'none'}"`,
				user.homeroom,
				user.graduationYear,
				user.osis
			].join(','))
		];

		const csvContent = csvRows.join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		
		link.setAttribute('href', url);
		link.setAttribute('download', `admin_panel_export_${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Admin Panel</h1>
		<p>Members with is_tutee of FALSE are ARISTA members.</p>
		<p>Members with is_tutee of TRUE are NOT ARISTA members.</p>
		<p>Click on a user's name to view more information and strike them.</p>
	</hgroup>

	<!-- Search and Filter Controls -->
	<div class="card p-4 space-y-4">
		<h3 class="h3">Search & Filters</h3>
		
		<!-- Search Bar -->
		<div class="w-full">
			<label for="search" class="block text-sm font-medium mb-2">Search Users</label>
			<input 
				id="search"
				type="text" 
				bind:value={searchQuery}
				placeholder="Search by name or email..."
				class="input w-full"
			/>
		</div>
		
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
		<div class="flex justify-between items-center">
			<p class="text-sm text-token-500">
				Showing {filteredUsers.length} of {data.users.length} users
			</p>
			<button 
				class="btn variant-filled-primary"
				on:click={exportToCSV}
				disabled={filteredUsers.length === 0}
			>
				Export to CSV ({filteredUsers.length} users)
			</button>
		</div>
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
