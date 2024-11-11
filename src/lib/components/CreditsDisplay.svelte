<script lang="ts">
	import type { RecievedCredit } from "$lib/db_types";
	import CategoryCreditDisplay from "$lib/components/CategoryCreditDisplay.svelte";

	export let credits: RecievedCredit[];
</script>

<section>
	<CategoryCreditDisplay {credits} type="event" />
	<CategoryCreditDisplay {credits} type="tutoring" />
	<CategoryCreditDisplay {credits} type="other" />
</section>
