<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="container mx-auto p-8 space-y-8">
	<section>
		<h1 class="h1">{data.event.name}</h1>
		<h3 class="h3">{data.event.description}</h3>
		<p class="font-bold">Start time: {data.event.start_time.toDateString()}</p>
		<p class="font-bold">End time: {data.event.end_time.toDateString()}</p>
		<p>Multiper: {data.event.multiplier}</p>
		<p>{data.event.signed_up.length} people are currently signed up.</p>
		<p>Is out of school: {data.event.is_out_of_school}</p>

		{#if data.is_current_user_signed_up}
			<h3 class="h3">You are signed up for this event.</h3>
			<form method="POST" action="?/event_unsign_up">
				<input type="submit" class="btn variant-outline-secondary" value="Leave event" />
			</form>
		{:else}
			<form method="POST" action="?/event_sign_up">
				<input type="submit" class="btn variant-filled-secondary" value="Sign Up" />
			</form>
		{/if}
	</section>
</main>
