<script lang="ts">
	import type { ExpandedCredit, CommitteesSchema, RecievedUser, OpenUser } from "$lib/db_types";
	import CategoryCreditDisplay from "$lib/components/CategoryCreditDisplay.svelte";
	import { number } from "zod";

	export let credits: ExpandedCredit[]; // credits still have to be given manually in case
	export let user: OpenUser;
</script>

<section>
	<CategoryCreditDisplay {credits} type="event" {user} />
	<CategoryCreditDisplay {credits} type="tutoring" {user} />
	<CategoryCreditDisplay {credits} type="other" {user} />
</section>
