
// note, this file and folder must be moved next to the pb_data folder of the pocketbase database folder
onRecordAfterUpdateRequest(async (e) => {
    const old_record = e.record.originalCopy();
    if (!old_record.get("isComplete") && e.record.get("isComplete")) {
        // was just completed

        // # of hours
        const hours_num = e.record.get("durationInHours");
        const tutor_id = e.record.get("tutor");

        console.log("CREATING CREDITnew: ", JSON.stringify({
            credits: hours_num,
            user: tutor_id,
            event: null,
            session: e.record.get("id")
        }))

        const creditCollection = $app.dao().findCollectionByNameOrId("credits");
        const newCreditRecord = new Record(creditCollection);

        newCreditRecord.set("credits", hours_num);
        newCreditRecord.set("user", tutor_id);
        newCreditRecord.set("event", null);
        newCreditRecord.set("session", e.record.get("id"));


        $app.dao().saveRecord(newCreditRecord);

        // const insert_query = $app.dao().db().insert("credits", {
        //     credits: hours_num,
        //     user: tutor_id,
        //     event: null,
        //     session: e.record.get("id")
        // }).execute();

        console.log("After save credit record query");

    }
}, "tutoringSessions")