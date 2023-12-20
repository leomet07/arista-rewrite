<script lang="ts">
	export let errors: string[] | undefined;
</script>

{#if errors}
	{#each errors as error}
		<aside class="alert variant-filled-error mb-4">
			<b>{error}</b>
		</aside>
	{/each}
{/if}
