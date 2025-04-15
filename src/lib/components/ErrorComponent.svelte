<script lang="ts">
	import type { ValidationErrors } from "sveltekit-superforms";

	export let errors: Record<string, string[]> | undefined | ValidationErrors<any>;

	let errors_use: Iterable<any> | undefined = errors as any;
</script>

{#if errors_use}
	{#each Object.entries(errors_use) as error_parent}
		{#each error_parent[1] as error}
			<aside class="alert variant-filled-error mb-4">
				<b>{error_parent[0] != "_errors" ? `${error_parent[0]}:` : ""} {error}</b>
			</aside>
		{/each}
	{/each}
{/if}
