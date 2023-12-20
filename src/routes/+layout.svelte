<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import "../app.postcss";
	import { AppShell } from "@skeletonlabs/skeleton";
</script>

<svelte:head>
	<title>Stuyvesant ARISTA</title>
	<!-- TODO: Add meta description tag <= 160 chars -->
</svelte:head>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Navbar />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
