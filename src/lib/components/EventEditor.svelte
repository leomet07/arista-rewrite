<script lang="ts">
	import { EventSchema, type RecievedEvent } from "$lib/db_types";
	import { SlideToggle } from "@skeletonlabs/skeleton";
	import { isOnCommittee } from "$lib/isOnCommittee";
	import { currentUser } from "$lib/pocketbase";
	import type { SuperValidated, Infer } from "sveltekit-superforms";
	import { DateInput } from "date-picker-svelte";
	import ErrorComponent from "$lib/components/ErrorComponent.svelte";
	import { browser } from "$app/environment";
	import InputField from "$lib/components/InputField.svelte";
	import type { SuperForm } from "sveltekit-superforms/client";

	export let promptText: "Update" | "Create" = "Create";
	export let formObj: SuperForm<Infer<typeof EventSchema>>;
	const { form, errors, constraints, message } = formObj;
</script>

<h2 class="h2">{promptText} an Event</h2>
<ErrorComponent errors={$errors} />

<InputField
	form={formObj}
	field="name"
	label="Enter the event's title:"
	placeholder="Blood drive, PS100 Fall Festival, Board games with the Elderly"
/>
<InputField
	form={formObj}
	field="location"
	label="Enter the event's location:"
	placeholder="Stuyvesant High School, PS100, Prospect Park, etc"
/>
<InputField
	form={formObj}
	field="description"
	label="Enter the event's description:"
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
<input name="start_time" type="data" bind:value={$form.start_time} style="display : none;" />

<label for="end_time">Choose an end time for this event</label>
{#if browser}
	<DateInput
		id="end_time"
		bind:value={$form.end_time}
		dynamicPositioning
		max={new Date("2029-01-01 00:00:00")}
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
<button class="btn variant-filled" type="submit">{promptText} Event</button>
