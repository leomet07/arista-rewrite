<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SuperForm } from "sveltekit-superforms";

	export let form: SuperForm<
		{
			csv_string: string;
		},
		any
	>;
</script>

<div class="card p-4 w-full text-token space-y-4">
	<h1>Mass Creditor</h1>
	<p>
		Enter data in a csv format of <code>osis,credit_num,credit_type,manual_explanation</code> (each line
		is a new entry)
	</p>
	<form method="POST" action="?/mass_credit" use:enhance>
		<textarea class="text-black w-auto" name="csv_string" id="mass_credit_csv_string"></textarea>
		<br />
		<input type="submit" class="btn variant-filled-secondary" />
	</form>
</div>
