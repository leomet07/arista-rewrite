<!-- https://superforms.rocks/components#using-the-componentized-field-in-awesome-ways -->
<script lang="ts" context="module">
	import type { AnyZodObject } from "zod";
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { z } from "zod";
	import type { ZodValidation, FormPathLeaves } from "sveltekit-superforms";
	import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
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

	const { value, errors, constraints } = formFieldProxy(form, field);
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
