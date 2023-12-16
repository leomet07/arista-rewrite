<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import "../app.postcss";
	import { AppShell } from "@skeletonlabs/skeleton";
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Navbar />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
