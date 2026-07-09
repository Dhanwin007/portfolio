import { z } from "zod";

export const achievementSchema = z.object({

    title: z

        .string()

        .trim()

        .min(
            1,
            "Achievement title is required."
        )

        .max(
            150,
            "Achievement title must be at most 150 characters."
        ),

    description: z

        .string()

        .trim(),

    achievement_date: z

        .string(),

});

export type AchievementFormValues =
    z.infer<
        typeof achievementSchema
    >;