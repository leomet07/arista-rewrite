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
	const { form, errors, constraints } = formObj;

	import { DateInput } from "date-picker-svelte";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import { enhance } from "$app/forms";
	import EventsCalendar from "$lib/components/EventsCalendar.svelte";
	import { browser } from "$app/environment";
	import InputField from "$lib/components/InputField.svelte";
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
				<h2 class="h2">Create an Event</h2>
				<ErrorComponent errors={$errors._errors} />

				<InputField
					form={formObj}
					field="name"
					label="Enter the event's title:"
					placeholder="Blood drive, PS100 Fall Festival, Board games with the Elderly"
				/>
				<InputField
					form={formObj}
					field="description"
					label="Enter the event's title:"
					placeholder="Helping people, Saving the world, Assisting the Red Cross, etc"
				/>

				<label for="start_time">Choose a start time for this event</label>
				{#if browser}
					<DateInput
						id="start_time"
						bind:value={$form.start_time}
						dynamicPositioning
						timePrecision="minute"
						format="yyyy-MM-dd HH:mm"
					/>
				{/if}
				{#if $errors.start_time}<span class="invalid">{$errors.start_time}</span>{/if}
				<!-- Bind to invisible date input so it can be submitted via form -->
				<input
					name="start_time"
					type="data"
					bind:value={$form.start_time}
					style="display : none;"
				/>

				<label for="end_time">Choose an end time for this event</label>
				{#if browser}
					<DateInput
						id="end_time"
						bind:value={$form.end_time}
						dynamicPositioning
						timePrecision="minute"
						format="yyyy-MM-dd HH:mm"
					/>
				{/if}
				{#if $errors.end_time}<span class="invalid">{$errors.end_time}</span>{/if}
				<!-- Bind to invisible date input so it can be submitted via form -->
				<input name="end_time" type="data" bind:value={$form.end_time} style="display : none;" />

				<InputField
					form={formObj}
					field="multiplier"
					label="Choose a credits multiplier (default is 1.0):"
					inputmode="numeric"
				/>

				<label for="is_out_of_school">Is this event taking place out of school?</label>
				<SlideToggle
					name="is_out_of_school"
					bind:checked={$form.is_out_of_school}
					active="bg-primary-500 dark:bg-primary-500"
					{...$constraints.is_out_of_school}
				></SlideToggle>
				<br />
				<button class="btn variant-filled" type="submit">Create Event</button>
			</form>
		{/if}
	</section>
</main>
