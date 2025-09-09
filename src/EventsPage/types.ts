import z from "zod";
export const EventSchema = z.object({
	name: z.string().min(1, "name is required"),
	description: z.string().min(1, "description is required"),
	location: z.string().min(1, "title is required"),
});

export type EventSchemaType = z.infer<typeof EventSchema>;
