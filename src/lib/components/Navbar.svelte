<script lang="ts">
	import { AppBar } from "@skeletonlabs/skeleton";
	import { pb, currentUser } from "$lib/pocketbase";
	import { LightSwitch, Avatar } from "@skeletonlabs/skeleton";
	import { isOnCommittee } from "$lib/isOnCommittee";

	function generateInitials(user: any | null) {
		return !user?.name
			? ""
			: (user.name as string)
					.split(" ")
					.map((v: string) => v.substring(0, 1))
					.join("");
	}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/"><strong class="text-xl uppercase">ARISTA</strong></a>
	</svelte:fragment>
	<svelte:fragment slot="default">
		{#if $currentUser}
			{#if $currentUser.is_tutee}
				<a href="/tutoring">Tutoring</a>
			{:else}
				<a href="/events">Events</a>
				<a class="ml-2" href="/tutoring">Tutor</a>
			{/if}
			{#if isOnCommittee($currentUser, "admin")}
				<a class="ml-2" href="/admin">Admin</a>
			{/if}
		{/if}
		<a class="ml-2" href="/studyguides">Study <span class="hidden lg:inline">Guides</span></a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<!-- <LightSwitch /> -->
		{#if !$currentUser}
			<a href="/register">Register</a>
			<a href="/login">Login</a>
		{:else}
			<a href="/settings">
				<Avatar initials={generateInitials($currentUser)} background="bg-primary-500" class="w-8" />
			</a>
		{/if}
	</svelte:fragment>
</AppBar>
