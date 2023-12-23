<script lang="ts">
	import { AppBar } from "@skeletonlabs/skeleton";
	import { pb, currentUser } from "$lib/pocketbase";
	import { goto } from "$app/navigation";
	import { LightSwitch } from "@skeletonlabs/skeleton";

	async function logout() {
		pb.authStore.clear();
		await goto("/");
	}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/"><strong class="text-xl uppercase">ARISTA</strong></a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		{#if !$currentUser}
			<a href="/register">Register</a>
			<a href="/login">Login</a>
		{:else}
			<a href="/events">Events</a>
			<a href="/" on:click={logout}>Logout</a>
		{/if}
	</svelte:fragment>
</AppBar>
