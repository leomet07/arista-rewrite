<script lang="ts">
	import {
		formFieldProxy,
		type FormFieldProxy,
		type SuperForm,
		type FormPathLeaves
	} from "sveltekit-superforms";
	export let form: SuperForm<
		{
			csv_string: string;
		},
		any
	>;

	const { delayed, enhance } = form;

	const { value, errors, constraints } = formFieldProxy(
		form,
		"csv_string"
	) satisfies FormFieldProxy<string>;
</script>

<div class="card p-4 w-full text-token space-y-4">
	<hgroup>
		<h1>Mass Creditor</h1>
		<p>
			Enter data in a csv format of <code>osis,credit_num,credit_type,manual_explanation</code> (each
			line is a new entry).
		</p>
		<p>
			Credit type can only be <code>event</code> or <code>tutoring</code> or <code>other</code> .
		</p>
		<p>Invalid lines will be returned to you and kept inside the text box.</p>
	</hgroup>
	<p>Line count: {$value.trim().split("\n").length} lines</p>
	<form method="POST" action="?/mass_credit" use:enhance>
		{#if $delayed}
			<!-- Technichally you should not show loading bar until 200ms have passed (use delayed field for that) -->
			<!-- But instant loading is useful here for admin dashboard purposes -->
			<p>Loading...Crediting...</p>
		{/if}
		<textarea
			class="text-black resize w-full min-h-96 mb-2"
			name="csv_string"
			id="mass_credit_csv_string"
			placeholder="osis,credit_num,credit_type,manual_explanation"
			bind:value={$value}
		></textarea>
		<br />
		<input type="submit" class="btn variant-filled-secondary" />
	</form>
</div>
