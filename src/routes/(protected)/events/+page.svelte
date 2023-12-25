<script lang="ts">
	import type { LayoutData } from "./$types";
	import "@event-calendar/core/index.css";
	import { goto } from "$app/navigation";
	import type { RecievedEvent } from "$lib/db_types";
	import { modeCurrent } from "@skeletonlabs/skeleton";
	// @ts-ignore
	import Calendar from "@event-calendar/core";
	// @ts-ignore
	import DayGrid from "@event-calendar/day-grid";
	// @ts-ignore
	import ListView from "@event-calendar/list";
	import { isOnCommittee } from "$lib/isOnCommittee";
	import { currentUser } from "$lib/pocketbase";

	export let data: LayoutData;

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
</script>

<main class="container mx-auto py-8 px-2 space-y-8">
	<h1 class="h1">Events General Calendar</h1>

	<div class={!$modeCurrent ? "ec-dark" : ""}>
		<Calendar {plugins} {options} />
	</div>

	<section>
		{#if isOnCommittee($currentUser, "events")}
			<form action="" class="card p-4 w-full text-token space-y-4">
				<h2 class="h2">Create an Event</h2>
			</form>
		{/if}
	</section>
</main>
