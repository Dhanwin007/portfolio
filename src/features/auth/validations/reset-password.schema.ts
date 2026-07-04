import { z } from "zod";

export const resetPasswordSchema = z
    .object({

        password: z
            .string()
            .trim()
            .min(
                8,
                "Password must be at least 8 characters."
            )
           
            ,

        confirmPassword: z
            .string()
            .trim(),

    })
    .refine(
        (data) =>
            data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match.",
        }
    );

export type ResetPasswordFormValues =
    z.infer<typeof resetPasswordSchema>;