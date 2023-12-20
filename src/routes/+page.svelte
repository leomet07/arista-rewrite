<script lang="ts">
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import { currentUser } from "$lib/pocketbase";

	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
</script>

<main class="container mx-auto p-8 space-y-8">
	{#if $currentUser}
		<hgroup>
			<h1 class="h1">Your event credits.</h1>
			<p class="h5">Input your service hours here.</p>
		</hgroup>

		<form method="POST" class="card p-4 w-full text-token space-y-4">
			<input
				class="input"
				type="text"
				name="title"
				placeholder="Enter a title..."
				aria-invalid={$errors.title ? "true" : undefined}
				bind:value={$form.title}
				{...$constraints.title}
			/>
			{#if $errors.title}<span class="invalid">{$errors.title}</span>{/if}
			<br />
			<input
				class="input"
				type="text"
				name="description"
				placeholder="Enter a description..."
				aria-invalid={$errors.description ? "true" : undefined}
				bind:value={$form.description}
				{...$constraints.description}
			/>
			{#if $errors.description}<span class="invalid">{$errors.description}</span>{/if}
			<br />
			<input
				class="input"
				type="number"
				name="num_of_hours"
				aria-invalid={$errors.num_of_hours ? "true" : undefined}
				bind:value={$form.num_of_hours}
				{...$constraints.num_of_hours}
			/>
			{#if $errors.num_of_hours}<span class="invalid">{$errors.num_of_hours}</span>{/if}
			<br />
			<input type="submit" class="btn variant-filled" value="Create Service Hours" />
		</form>

		{#if data.db_service_hours}
			<section class="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
				{#each data.db_service_hours as item}
					<div class="card p-4">
						<h3 class="h3">{item.title}</h3>
						<p class="font-bold">{item.num_of_hours} hours</p>
						{#if item.description}
							<p>{item.description}</p>
						{/if}
					</div>
				{/each}
			</section>
		{/if}
	{:else}
		<h3 class="h3">
			You aren't logged in.
			<a class="anchor" href="/login">Login please.</a>
		</h3>
	{/if}
</main>
