import z from "zod";
export const EventSchema = z.object({
	title: z.string().min(1, "title is required"),
	location: z.string().min(1, "title is required"),
});

export type EventSchemaType = z.infer<typeof EventSchema>;
