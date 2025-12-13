<script lang="ts">
	// @ts-ignore
	import Calendar from "@event-calendar/core";
	// @ts-ignore
	import DayGrid from "@event-calendar/day-grid";
	// @ts-ignore
	import ListView from "@event-calendar/list";
	import { modeCurrent } from "@skeletonlabs/skeleton";
	import { goto } from "$app/navigation";
	import type { RecievedEvent } from "$lib/db_types";
	import { SlideToggle } from "@skeletonlabs/skeleton";

	export let events: RecievedEvent[];
	let filteredEvents: RecievedEvent[];
	let selectedPlace = "All";
	let signupStatus = false;



	// Svelte Calendar Component:
	// https://github.com/vkurko/calendar
	let plugins = [DayGrid, ListView];
	
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	$: filteredEvents = events.filter(event =>
    (selectedPlace === "All" || event.place === selectedPlace) && (!signupStatus || (!event.signupStatus && event.end_time >= today))
  	);

	$: options = {
		view: "dayGridMonth",
		headerToolbar: {
			start: "prev,next",
			center: "title",
			end: "dayGridMonth,listMonth"
		},

		events: filteredEvents.map(transformEvent),
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
			title: event.signupStatus ? "[Sign-Ups Closed] " + event.name : event.name,
			start: event.start_time,
			end: event.end_time
		};
	}
</script>

<div class="flex flex-wrap gap-3 items-center mb-4">

	<div class="flex items-center gap-2">
		<label for="signupStatus" class="text-sm whitespace-nowrap">
			Show Open Events Only
		</label>
		<SlideToggle
			name="signupStatus"
			bind:checked={signupStatus}
			active="bg-primary-500 dark:bg-primary-500"
		/>
	</div>

	<div class="flex items-center gap-2">
		<label for="place-filter" class="text-sm whitespace-nowrap">
			Place
		</label>

		<select
			id="place-filter"
			name="place"
			bind:value={selectedPlace}
			class="rounded-lg border border-surface-300 bg-surface-50 
			text-surface-900 dark:bg-surface-800 dark:text-surface-50 p-1 
			text-sm"
		>
			<option value="All">All</option>
			<option value="In Stuy">In Stuy</option>
			<option value="Queens">Queens</option>
			<option value="Manhattan">Manhattan</option>
			<option value="Brooklyn">Brooklyn</option>
			<option value="Bronx">Bronx</option>
			<option value="Staten Island">Staten Island</option>
			<option value="Other">Other</option>
		</select>
	</div>

</div>

<div class={!$modeCurrent ? "ec-dark" : ""}>
	<Calendar {plugins} {options} />
</div>
