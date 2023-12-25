<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import InputField from "$lib/components/InputField.svelte";

	export let data: PageData;
	const formObj = superForm(data.form);
	const { form, errors, constraints } = formObj;
</script>

<main class="container mx-auto p-8 space-y-8">
	<hgroup>
		<h1 class="h1">Register</h1>
		<p>Register to ARISTA with your Stuy.edu email!</p>
	</hgroup>

	<ErrorComponent errors={$errors._errors} />

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
		class="card p-4 w-full text-token space-y-4"
	>
		<InputField form={formObj} field="name" label="Enter your name:" placeholder="John Doe" />

		<InputField
			form={formObj}
			field="email"
			label="Enter your email:"
			placeholder="email@stuy.edu"
			type="email"
		/>

		<InputField
			form={formObj}
			field="password"
			label="Enter a strong password:"
			placeholder="a_long_and_secure_password"
			type="password"
		/>

		<InputField
			form={formObj}
			field="passwordConfirm"
			label="Enter the password again:"
			type="password"
		/>

		<input type="submit" class="btn variant-filled" value="Register" />
	</form>
</main>
