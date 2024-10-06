<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import "../app.postcss";
	import { AppShell, Modal } from "@skeletonlabs/skeleton";
	import { initializeStores } from "@skeletonlabs/skeleton";

	initializeStores();
</script>

<svelte:head>
	<title>Stuyvesant ARISTA</title>
	<meta name="description" content="ARISTA, an honor society, promotes scholarship, leadership, character, and service through school volunteering, external partnerships, and student tutoring." />
</svelte:head>

<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Navbar />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
