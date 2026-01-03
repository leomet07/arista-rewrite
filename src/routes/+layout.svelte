<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import LoadingScreen from "$lib/components/LoadingScreen.svelte";
	import "../app.postcss";
	import { AppShell, Modal } from "@skeletonlabs/skeleton";
	import { initializeStores } from "@skeletonlabs/skeleton";
	import { navigating } from "$app/stores";

	initializeStores();
</script>

<svelte:head>
	<title>Stuyvesant ARISTA</title>
	<!-- TODO: Add meta description tag <= 160 chars -->
</svelte:head>

<Modal />

<!-- Loading Screen -->
{#if $navigating}
	<LoadingScreen />
{/if}

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Navbar />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
