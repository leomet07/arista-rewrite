import { writable, type Writable } from 'svelte/store';
import type { ExtraCurricular } from "$lib/db_types";

export let extracurriculars: Writable<ExtraCurricular[] | undefined> = writable(undefined);
