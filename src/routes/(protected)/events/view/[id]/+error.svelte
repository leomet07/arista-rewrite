<script>
	import { page } from "$app/stores";
</script>

<main class="container mx-auto p-8 space-y-8">
	<h1 class="h1">{$page?.error?.message}</h1>
</main>
