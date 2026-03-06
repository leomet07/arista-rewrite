<script lang="ts">
	import { onMount } from 'svelte';
	
	interface LeaderboardEntry {
		rank: number;
		name: string;
		hours: number;
	}

	let leaderboard: LeaderboardEntry[] = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const response = await fetch('/api/leaderboard');
			if (response.ok) {
				leaderboard = await response.json();
			} else {
				error = 'Failed to load leaderboard';
			}
		} catch (e) {
			error = 'Error loading leaderboard';
			console.error(e);
		} finally {
			loading = false;
		}
	});
</script>

<main class="container mx-auto p-8 space-y-8">
	<div class="text-center space-y-2">
		<h1 class="h1 text-primary-500">Top Tutors This Semester</h1>
	</div>

	{#if loading}
		<div class="card p-8 text-center max-w-3xl mx-auto">
			<div class="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
			<p class="text-lg">Loading leaderboard...</p>
		</div>
	{:else if error}
		<div class="card p-8 variant-filled-error max-w-3xl mx-auto">
			<p class="text-lg">{error}</p>
		</div>
	{:else if leaderboard.length === 0}
		<div class="card p-8 text-center max-w-3xl mx-auto">
			<p class="text-lg text-surface-600 dark:text-surface-400">
				No tutoring data yet this semester. Be the first to tutor!
			</p>
		</div>
	{:else}
		<div class="max-w-3xl mx-auto space-y-3">
			{#each leaderboard as entry}
				<div class="card p-4 flex items-center justify-between hover:variant-soft-primary transition-all">
					<div class="flex items-center gap-4">
						<span class="text-primary-500 font-bold text-lg">#{entry.rank}</span>
						<span class="text-lg">{entry.name}</span>
					</div>
					<span class="text-primary-500 font-semibold text-lg">{entry.hours}h</span>
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
	.card:hover {
		transform: translateY(-2px);
	}
</style>