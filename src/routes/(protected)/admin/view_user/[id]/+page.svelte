<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import { enhance } from "$app/forms";
	import { superForm, formFieldProxy } from "sveltekit-superforms";
	import InputField from "$lib/components/InputField.svelte";
	import calculateTotalStrikeWeight from "$lib/calculateTotalStrikeWeight";
	import { CodeBlock, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import StrikesDisplay from "$lib/components/StrikesDisplay.svelte";
	import CreditsDisplay from "$lib/components/CreditsDisplay.svelte";

	let user_id = $page.params.id;
	export let data: PageData;
	const strikeFormObj = superForm(data.strikeForm);
	const creditFormObj = superForm(data.creditForm);

	const creditFormType = formFieldProxy(creditFormObj, "type").value;

	$: full_user = data.users.filter((v) => v.id === user_id)[0];
</script>

<main class="container mx-auto p-8 space-y-8">
	<h2 class="h2">Viewing {full_user.name}</h2>
	<h3 class="h3">Email: {full_user.email}</h3>
	<CreditsDisplay credits={full_user.credits} />
	<StrikesDisplay strikes={full_user.strikes} />
	<form
		class="card p-4 w-full text-token space-y-4"
		method="POST"
		action="?/credit_user"
		use:enhance
	>
		<h3 class="h3">Credit {full_user.name} for:</h3>
		<InputField
			label="Enter the # of credits: "
			placeholder="1"
			field="credits"
			form={creditFormObj}
		/>
		<InputField
			label="What is this manual crediting for? Please provide an explanation."
			placeholder="Tutee mistyped credit, last minute addition to event, etc..."
			field="manualExplanation"
			form={creditFormObj}
		/>
		<div>
			<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={$creditFormType} name="type" value="event">event</RadioItem>
				<RadioItem bind:group={$creditFormType} name="type" value="tutoring">tutoring</RadioItem>
				<RadioItem bind:group={$creditFormType} name="type" value="other">other</RadioItem>
			</RadioGroup>
		</div>

		<button type="submit" class="btn variant-filled-secondary">Credit User</button>
	</form>
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
			form={strikeFormObj}
		/>
		<InputField
			label="Weight: (as a positive, rational number)"
			field="weight"
			form={strikeFormObj}
		/>
		<button type="submit" class="btn variant-filled-secondary">Strike User</button>
	</form>
</main>
