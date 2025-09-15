import z from "zod";

export const EventSchema = z.object({
	name: z.string().nonempty("name is required").min(6, "name must be at least 6 characters"),
	description: z
		.string()
		.nonempty("description is required")
		.min(20, "description must be at least 20 characters"),
	location: z
		.string()
		.nonempty("location is required")
		.min(3, "location must be at least 3 characters"),
});

export type EventSchemaType = z.infer<typeof EventSchema>;
