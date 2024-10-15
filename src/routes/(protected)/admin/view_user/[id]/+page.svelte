<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import { enhance } from "$app/forms";
	import { superForm } from "sveltekit-superforms";
	import InputField from "$lib/components/InputField.svelte";
	import calculateTotalStrikeWeight from "$lib/calculateTotalStrikeWeight";
	import StrikesDisplay from "$lib/components/StrikesDisplay.svelte";

	let user_id = $page.params.id;
	export let data: PageData;
	const formObj = superForm(data.form);
	const { form, errors, constraints } = formObj;

	$: full_user = data.users.filter((v) => v.id === user_id)[0];
</script>

<main class="container mx-auto p-8 space-y-8">
	<h2 class="h2">Viewing {full_user.name}</h2>
	<h3 class="h3">Email: {full_user.email}</h3>
	<StrikesDisplay strikes={full_user.strikes} />

	<form
		class="card p-4 w-full text-token space-y-4"
		method="POST"
		action="?/strike_user"
		use:enhance
	>
		<h3 class="h3">Strike {full_user.name} for:</h3>
		<InputField
			label="Reason: "
			placeholder="Skipping an event, not attending a mandatory meeting..."
			field="reason"
			form={formObj}
		/>
		<InputField label="Weight: (as a positive, rational number)" field="weight" form={formObj} />
		<button type="submit" class="btn variant-filled-secondary">Strike User</button>
	</form>
	<pre>{JSON.stringify(full_user, null, 4)}</pre>
</main>
