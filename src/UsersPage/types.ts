import z from "zod";

export const userSchema = z
	.object({
		email: z.email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
		confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
export type UserSchemaType = z.infer<typeof userSchema>;
