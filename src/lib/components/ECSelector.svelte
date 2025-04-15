<script lang="ts">
	import { ExtraCurricularSchema, type ExtraCurricular } from "$lib/db_types";
	import type { SuperForm } from "sveltekit-superforms/client";
	import type { SuperValidated, Infer } from "sveltekit-superforms";
	import InputField from "$lib/components/InputField.svelte";
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import ErrorComponent from "./ErrorComponent.svelte";
	import { extracurriculars } from "$lib/components/ECSelectorStore";
	import ECCategoryDisplay from "./ECCategoryDisplay.svelte";

	let organization = "";
	let position = "";
	let description = "";
	let hoursPerWeek = "";
	let weeksPerYear = "";
	let advisorName = "";
	let advisorContact = "";
	let category: ExtraCurricular["category"] | "" = "";

	let errors: any;

	function onAddECButtonClick(event: SubmitEvent) {
		console.log("adding an ec!");

		if (category == "") {
			errors = {
				_errors: ["You must select the category for this extracurricular."]
			};
			return;
		}

		let new_ec: ExtraCurricular = {
			organization,
			position,
			description,
			hoursPerWeek: String(hoursPerWeek),
			weeksPerYear: String(weeksPerYear),
			advisorName,
			advisorContact,
			category
		};

		// validate here
		let safe_ec = ExtraCurricularSchema.safeParse(new_ec);

		if (!safe_ec.success) {
			errors = { [safe_ec.error.issues[0].path[0]]: [safe_ec.error.issues[0].message] };
			return;
		}

		$extracurriculars = [...($extracurriculars || []), safe_ec.data];
		errors = {};

		// reset form
		let form = event.target as HTMLFormElement;
		form.reset();
		category = ""; // reset form category selection

		console.log($extracurriculars);
	}
</script>

<div class="space-y-4">
	<h3 class="h3">EC Selector</h3>

	<ECCategoryDisplay formattedName="In School Service Activities" category="service_in_stuy" />
	<ECCategoryDisplay formattedName="Out of School Service Activities" category="service_out_stuy" />
	<ECCategoryDisplay formattedName="In School Extracurriculars" category="ecs_in_stuy" />
	<ECCategoryDisplay formattedName="Out of School Extracurriculars" category="ecs_out_stuy" />

	<!-- Superform is too much, just use svelte stores and validate on server here -->
	<form class="card p-4" on:submit|preventDefault={onAddECButtonClick}>
		<h3 class="h3">Record an Extracurricular</h3>
		<label for="">
			Organization Name
			<input class="input" type="text" bind:value={organization} required />
		</label>
		<label for="">
			Your Position
			<input class="input" type="text" bind:value={position} required />
		</label>
		<label for="">
			Description
			<input class="input" type="text" bind:value={description} required />
		</label>
		<label for="">
			Hours Per Week
			<input class="input" inputmode="numeric" type="number" bind:value={hoursPerWeek} required />
		</label>
		<label for="">
			Weeks Per Year
			<input class="input" inputmode="numeric" type="number" bind:value={weeksPerYear} required />
		</label>
		<label for="">
			Advisor Name
			<input class="input" type="text" bind:value={advisorName} required />
		</label>
		<label for="">
			Advisor Contact
			<input class="input" type="text" bind:value={advisorContact} required />
		</label>
		<div class="mt-2 mb-2">
			<h4 class="h4">Please select one category that this extracurricular belongs in.</h4>
			<RadioGroup rounded="rounded-container-token" flexDirection="flex-col">
				<RadioItem bind:group={category} name="justify" value={"service_in_stuy"}>
					Service Activities Inside Stuyvesant
				</RadioItem>
				<RadioItem bind:group={category} name="justify" value={"service_out_stuy"}>
					Service Activities Outside of Stuyvesant
				</RadioItem>
				<RadioItem bind:group={category} name="justify" value={"ecs_in_stuy"}>
					Extracurriculars Activities Inside Stuyvesant
				</RadioItem>
				<RadioItem bind:group={category} name="justify" value={"new_type"}>
					Extracurriculars Activities Outside of Stuyvesant
				</RadioItem>
			</RadioGroup>
		</div>
		<ErrorComponent {errors} />
		<button type="submit" class="btn variant-filled">Add Extracurricular</button>
	</form>
</div>
