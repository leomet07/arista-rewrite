<script lang="ts">
	import type { PageData } from "./$types";
	import "@event-calendar/core/index.css";
	import { superForm } from "sveltekit-superforms";
	import type { RecievedEvent } from "$lib/db_types";
	import { SlideToggle } from "@skeletonlabs/skeleton";
	import { isOnCommittee } from "$lib/isOnCommittee";
	import { currentUser } from "$lib/pocketbase";

	export let data: PageData;
	const formObj = superForm(data.form);

	import { DateInput } from "date-picker-svelte";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import { enhance } from "$app/forms";
	import EventsCalendar from "$lib/components/EventsCalendar.svelte";
	import { browser } from "$app/environment";
	import InputField from "$lib/components/InputField.svelte";
	import EventEditor from "$lib/components/EventEditor.svelte";
</script>

<main class="container mx-auto py-8 px-2 space-y-8">
	<h1 class="h1">Events General Calendar</h1>

	<EventsCalendar events={data.events} />

	<section class="pb-16">
		{#if isOnCommittee($currentUser, "events")}
			<form
				method="POST"
				action="?/create_event"
				class="card p-4 w-full text-token space-y-4"
				use:enhance
			>
				<EventEditor {formObj} />
			</form>
		{/if}
	</section>
</main>

<style>
	h1 {
		text-align: center;
	}
</style>