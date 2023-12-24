<script lang="ts">
	import { AppBar } from "@skeletonlabs/skeleton";
	import { pb, currentUser } from "$lib/pocketbase";

	import { LightSwitch, Avatar } from "@skeletonlabs/skeleton";

	let initials = !$currentUser?.name
		? ""
		: ($currentUser.name as string)
				.split(" ")
				.map((v: string) => v.substring(0, 1))
				.join("");
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/"><strong class="text-xl uppercase">ARISTA</strong></a>
	</svelte:fragment>
	<svelte:fragment slot="default">
		{#if $currentUser}
			<a href="/events">Events</a>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		{#if !$currentUser}
			<a href="/register">Register</a>
			<a href="/login">Login</a>
		{:else}
			<a href="/settings"><Avatar {initials} background="bg-primary-500" class="w-8" /></a>
		{/if}
	</svelte:fragment>
</AppBar>
