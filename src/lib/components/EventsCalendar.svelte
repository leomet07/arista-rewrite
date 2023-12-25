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

	export let events: RecievedEvent[];

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
		events: events.map(transformEvent),
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
</script>

<div class={!$modeCurrent ? "ec-dark" : ""}>
	<Calendar {plugins} {options} />
</div>
