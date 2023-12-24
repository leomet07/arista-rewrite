import { z } from "zod";

type StrictRecordModel = {
	id: string;
	created: string;
	updated: string;
	collectionId: string;
	collectionName: string;
}; // Same as pocketbase's record model, without the [key: string] : any

export const ServiceHourSchema = z.object({
	title: z.string().min(3).max(64),
	description: z.string().max(4000).optional(),
	num_of_hours: z.preprocess(
		(a) => parseInt(z.string().parse(a), 10),
		z.number().min(0.5).max(1000)
	)
});

export const UserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(3).max(48),
	avatar: z.string().optional()
});

export const EventSchema = z.object({
	name: z.string().min(3).max(64),
	description: z.string().max(4000),
	start_time: z.date(),
	end_time: z.date(),
	multiplier: z.number().min(1).max(5).default(1),
	is_out_of_school: z.boolean(),
	signed_up: z.string().array()
});


export type RecievedServiceHour = z.infer<typeof ServiceHourSchema> & StrictRecordModel;
export type RecievedUser = z.infer<typeof UserSchema> & StrictRecordModel;
export type RecievedEvent = z.infer<typeof EventSchema> & StrictRecordModel;
