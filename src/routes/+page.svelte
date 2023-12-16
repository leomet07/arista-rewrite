<script lang="ts">
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import { currentUser } from "$lib/pocketbase";

	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
</script>

<main class="container mx-auto p-8 space-y-8">
	{#if $currentUser}
		<form method="POST">
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

		<h1 class="h1">Hello Skeleton</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		<section>
			<a class="btn variant-filled-primary" href="https://kit.svelte.dev/">SvelteKit</a>
			<a class="btn variant-filled-secondary" href="https://tailwindcss.com/">Tailwind</a>
			<a class="btn variant-filled-tertiary" href="https://github.com/">GitHub</a>
		</section>

		<section>
			{#each data.db_service_hours as item}
				<div>
					<h2>{item.title}</h2>
					<h3>{item.num_of_hours} hours</h3>
					<p>id: {item.id}</p>
					{#if item.description}
						<p>{item.description}</p>
					{/if}
				</div>
			{/each}
		</section>

		<!-- Error popup -->
		<aside class="alert variant-filled-error">
			<!-- Icon -->
			<div>(icon)</div>
			<!-- Message -->
			<div class="alert-message text">
				<h3 class="h3">(title)</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aperiam minus iste maxime
					ipsam ducimus unde ullam officiis illo, culpa voluptates, tenetur vero architecto
					voluptatibus provident a dignissimos dolorem inventore!
				</p>
			</div>
			<!-- Actions -->
			<div class="alert-actions">(buttons)</div>
		</aside>
	{:else}
		<h2>
			You aren't logged in.
			<a href="/login" id="login_request">Login please.</a>
		</h2>
	{/if}
</main>
