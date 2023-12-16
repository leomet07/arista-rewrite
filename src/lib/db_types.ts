import type { RecordModel } from "pocketbase";
import { z } from "zod";

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

export type RecievedServiceHour = z.infer<typeof ServiceHourSchema> & RecordModel;

export type RecievedUser = z.infer<typeof UserSchema> & RecordModel;
