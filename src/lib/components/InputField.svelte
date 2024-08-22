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
	export let label: string = "";
	export let placeholder: string = "";
	export let type: string = "text";
	export let inputmode:
		| "email"
		| "search"
		| "text"
		| "none"
		| "tel"
		| "url"
		| "numeric"
		| "decimal" = "text";

	const { value, errors, constraints } = formFieldProxy(
		form,
		field
	) satisfies FormFieldProxy<string>;
</script>

<label>
	{label || field}<br />
	<input
		class="input"
		name={field}
		{...{ type }}
		{inputmode}
		aria-invalid={$errors ? "true" : undefined}
		bind:value={$value}
		{placeholder}
		{...$constraints}
		{...$$restProps}
	/>
</label>
{#if $errors}<span class="invalid">{$errors}</span>{/if}
