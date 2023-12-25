<script lang="ts">
	import type { PageData } from "./$types";
	import "@event-calendar/core/index.css";
	import { goto } from "$app/navigation";
	import { superForm } from "sveltekit-superforms/client";
	import type { RecievedEvent } from "$lib/db_types";
	import { SlideToggle, modeCurrent } from "@skeletonlabs/skeleton";
	// @ts-ignore
	import Calendar from "@event-calendar/core";
	// @ts-ignore
	import DayGrid from "@event-calendar/day-grid";
	// @ts-ignore
	import ListView from "@event-calendar/list";
	import { isOnCommittee } from "$lib/isOnCommittee";
	import { currentUser } from "$lib/pocketbase";

	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form, {
		resetForm: true
	});

	// Svelte Calendar Component:
	// https://github.com/vkurko/calendar
	let plugins = [DayGrid, ListView];
	let options = {
		view: "dayGridMonth",
		headerToolbar: {
			start: "prev,next",
			center: "title",
			end: "dayGridMonth,listMonth"
		},
		events: data.events.map(transformEvent),
		eventClick: (info: { event: CalendarEvent; el: HTMLElement }) => {
			console.log(info.event.title);
			goto("/events/view/" + info.event.id);
		}
	};

	type CalendarEvent = {
		id: string;
		resourceIds?: string[];
		allDay?: boolean;
		start: Date;
		end: Date;
		title: string;
		editable?: boolean;
		startEditable?: boolean;
		durationEditable?: boolean;
		display?: "auto" | "background";
		backgroundColor?: string;
		textColor?: string;
		extendedProps?: any;
	};

	function transformEvent(event: RecievedEvent): CalendarEvent {
		return {
			id: event.id,
			title: event.name,
			start: event.start_time,
			end: event.end_time
		};
	}

	import { DateInput } from "date-picker-svelte";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import { enhance } from "$app/forms";
</script>

<main class="container mx-auto py-8 px-2 space-y-8">
	<h1 class="h1">Events General Calendar</h1>

	<div class={!$modeCurrent ? "ec-dark" : ""}>
		<Calendar {plugins} {options} />
	</div>

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

				<label for="name">Enter the event's title:</label>
				<input
					class="input"
					type="text"
					name="name"
					placeholder="Blood drive, PS100 Fall Festival, Board games with the Elderly"
					aria-invalid={$errors.name ? "true" : undefined}
					bind:value={$form.name}
					{...$constraints.name}
				/>
				{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

				<label for="description">Enter the event's description:</label>
				<input
					class="input"
					type="text"
					name="description"
					placeholder="Helping people, Saving the world, Assisting the Red Cross, etc"
					aria-invalid={$errors.description ? "true" : undefined}
					bind:value={$form.description}
					{...$constraints.description}
				/>
				{#if $errors.description}<span class="invalid">{$errors.description}</span>{/if}

				<label for="start_time">Choose a start time for this event</label>
				<DateInput
					id="start_time"
					bind:value={$form.start_time}
					dynamicPositioning
					timePrecision="minute"
					format="yyyy-MM-dd HH:mm"
				/>
				{#if $errors.start_time}<span class="invalid">{$errors.start_time}</span>{/if}
				<!-- Bind to invisible date input so it can be submitted via form -->
				<input
					name="start_time"
					type="data"
					bind:value={$form.start_time}
					style="display : none;"
				/>

				<label for="end_time">Choose an end time for this event</label>
				<DateInput
					id="end_time"
					bind:value={$form.end_time}
					dynamicPositioning
					timePrecision="minute"
					format="yyyy-MM-dd HH:mm"
				/>
				{#if $errors.end_time}<span class="invalid">{$errors.end_time}</span>{/if}
				<!-- Bind to invisible date input so it can be submitted via form -->
				<input name="end_time" type="data" bind:value={$form.end_time} style="display : none;" />

				<label for="multiplier">Choose a credits multiplier (default is 1.0):</label>
				<input
					class="input"
					type="number"
					inputmode="numeric"
					name="multiplier"
					placeholder=""
					aria-invalid={$errors.multiplier ? "true" : undefined}
					bind:value={$form.multiplier}
					step="0.5"
					{...$constraints.multiplier}
				/>
				{#if $errors.multiplier}<span class="invalid">{$errors.multiplier}</span>{/if}

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
