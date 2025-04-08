<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { superForm } from "sveltekit-superforms";
	// import type { PageData } from "./$types";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";
	import { page } from "$app/stores";

	// export let data: PageData;
	// const formObj = superForm(data.form);
	// const { form, errors, constraints } = formObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Apply to ARISTA</h1>
		<p>Welcome to the ARISTA application.</p>
	</hgroup>

	<!-- <ErrorComponent errors={$errors} /> -->
</main>
