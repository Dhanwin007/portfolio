import { z } from "zod";

export const registerSchema = z
    .object({
        displayName: z
            .string()
            .trim()
            .min(3, "Display name must be at least 3 characters.")
            .max(50, "Display name cannot exceed 50 characters."),

        username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters.")
            .max(30, "Username cannot exceed 30 characters.")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers and underscores."
            ),

        email: z
            .string()
            .trim()
            .email("Please enter a valid email address."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .max(100, "Password cannot exceed 100 characters."),

        confirmPassword: z
            .string(),

        acceptTerms: z
            .boolean()
            .refine(
                (value) => value === true,
                {
                    message: "You must accept the Terms & Conditions.",
                }
            ),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );

export type RegisterFormValues = z.infer<typeof registerSchema>;