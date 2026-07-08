import { z } from "zod";

export const educationSchema = z.object({

    institution: z
        .string()
        .trim()
        .min(
            1,
            "Institution is required."
        )
        .max(
            150
        ),

    degree: z
        .string()
        .trim()
        .min(
            1,
            "Degree is required."
        )
        .max(
            150
        ),

    field: z
        .string()
        .trim()
        .max(
            150
        ),

    grade: z
        .string()
        .trim()
        .max(
            50
        ),

    start_date:
        z.string(),

    end_date:
        z.string(),

    description:
        z.string(),

});

export type EducationFormValues =
    z.infer<
        typeof educationSchema
    >;