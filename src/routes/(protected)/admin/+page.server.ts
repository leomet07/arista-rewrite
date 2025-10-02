import { error, redirect } from "@sveltejs/kit";
import { type RecievedCredit, type RecievedUser } from "$lib/db_types.js";
import type { PageServerLoad } from "./$types";
import { isOnCommittee } from "$lib/isOnCommittee";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import handleError, { handleGenericError } from "$lib/handleError";
import { z } from "zod";

const MassCreditorSchema = z.object({
    csv_string: z.string()
});

// Get the data, for page load
export const load = (async ({ params, locals }) => {
    // Server API:
    const mass_credit_form = await superValidate(zod(MassCreditorSchema));

    return {
        mass_credit_form: mass_credit_form
    };
}) satisfies PageServerLoad;

function isLineValid(line: string): boolean {
    // osis,credit_num,credit_type,manual_explanation

    let [osis, credit_num, credit_type, manual_explanation] = line.split(",").map(v => v.trim());

    if (Number.isNaN(Number(osis))) {
        return false;
    }
    if (Number.isNaN(Number(credit_num))) {
        return false;
    }
    if (!(["event", "tutoring", "other"].includes(credit_type))) {
        return false;
    }
    // manual explanation can be anything but min 3 chars
    if (manual_explanation.length <= 3) {
        return false;
    }
    return true;
}

export const actions = {
    mass_credit: async ({ request, locals, params }) => {
        if (!locals.user) {
            error(401, "User not logged in.");
        }

        if (!isOnCommittee(locals.user as RecievedUser, "admin") && !isOnCommittee(locals.user as RecievedUser, "operations")) {
            error(401, "User is not a member of the admin or operations committee.");
        }

        const form = await superValidate(request, zod(MassCreditorSchema));
        if (!form.valid) {
            return fail(400, { form });
        }

        const csv_string = form.data.csv_string.trim();
        const lines = csv_string.split("\n").map(v => v.trim());

        let invalid_lines: string[] = [];
        let valid_lines_db_requests: Promise<any>[] = [];
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            if (!isLineValid(line)) {
                invalid_lines.push(line);
            }

            let [osis, credit_num, credit_type, manual_explanation] = line.split(",").map(v => v.trim());

            let user;
            try {
                user = await locals.pb.collection("users").getFirstListItem(`osis=${osis}`, { requestKey: null });
            } catch (error: any) {
                invalid_lines.push(line);
                continue;
            }

            if (!user) {
                invalid_lines.push(line);
                continue;
            }

            if (user.is_tutee) {
                invalid_lines.push(line);
                continue;
            }

            let new_credit_body = {
                credits: parseInt(credit_num),
                manualExplanation: manual_explanation,
                type: credit_type,
                user: user.id
            };

            const create_credit_request = locals.pb.collection("credits").create(
                new_credit_body,
                { requestKey: null } // requestKey is null here to avoid cancelled requests when successive requests are ran
            );

            valid_lines_db_requests.push(create_credit_request);
            try {
                let results = await Promise.all(valid_lines_db_requests);
            } catch (error: any) {
                console.error(error);
            }
        }

        form.data.csv_string = invalid_lines.join("\n");

        return { mass_credit_form: form };

    },

};
