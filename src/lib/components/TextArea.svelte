<!-- https://superforms.rocks/components#using-the-componentized-field-in-awesome-ways -->
<script lang="ts" context="module">
	import type { AnyZodObject } from "zod";
	import type { Infer } from "sveltekit-superforms";
	type T = Infer<AnyZodObject>;
</script>

<script lang="ts" generics="T extends Infer<AnyZodObject>">
	import type { z } from "zod";
	import {
		formFieldProxy,
		type FormFieldProxy,
		type SuperForm,
		type FormPathLeaves
	} from "sveltekit-superforms";

	export let form: SuperForm<T, any>;
	export let field: FormPathLeaves<T>;
	export let placeholder: string = "";

	const { value, errors, constraints } = formFieldProxy(
		form,
		field
	) satisfies FormFieldProxy<string>;
</script>

<label>
	<div class="md:flex block justify-between items-center mb-1">
		<div>
			<slot></slot>
		</div>
		<span class="text-right mt-2 md:mt-0"
			>{$value?.length ?? 0} / {$constraints?.maxlength} characters</span
		>
	</div>
	<textarea
		class="text-black rounded-md border-primary-100 bg-secondary-200 resize w-full min-h-96 mb-2"
		name={field}
		{placeholder}
		{...$constraints}
		{...$$restProps}
		bind:value={$value}
	></textarea>
</label>

{#if $errors}<span class="invalid">{$errors}</span>{/if}
