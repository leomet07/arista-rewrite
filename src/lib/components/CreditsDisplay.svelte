<script lang="ts">
	import type { ExpandedCredit } from "$lib/db_types";
	import CategoryCreditDisplay from "$lib/components/CategoryCreditDisplay.svelte";

	export let credits: ExpandedCredit[];
</script>

<section>
	<CategoryCreditDisplay {credits} type="event" />
	<CategoryCreditDisplay {credits} type="tutoring" />
	<CategoryCreditDisplay {credits} type="other" />
</section>
