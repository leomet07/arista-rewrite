<script lang="ts">
	export let errors: Record<string, string[]> | undefined;
</script>

{#if errors}
	{#each Object.entries(errors) as error_parent}
		{#each error_parent[1] as error}
			<aside class="alert variant-filled-error mb-4">
				<b>{error_parent[0] != "_errors" ? `${error_parent[0]}:` : ""} {error}</b>
			</aside>
		{/each}
	{/each}
{/if}
