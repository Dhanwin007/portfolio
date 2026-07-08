import { z } from "zod";

export const experienceSchema = z.object({

    company: z
        .string()
        .trim()
        .min(
            1,
            "Company is required."
        )
        .max(150),

    position: z
        .string()
        .trim()
        .min(
            1,
            "Position is required."
        )
        .max(150),

    employment_type: z.enum([

        "full_time",

        "part_time",

        "internship",

        "contract",

        "freelance",

        "self_employed",

        "temporary",

        "volunteer",

        "other",

    ]),

    location: z
        .string()
        .trim(),

    start_date:
        z.string(),

    end_date:
        z.string(),

    currently_working:
        z.boolean(),

    description:
        z.string(),

}).superRefine((data, ctx) => {

    if (

        !data.currently_working &&

        !data.end_date.trim()

    ) {

        ctx.addIssue({

            code: z.ZodIssueCode.custom,

            path: ["end_date"],

            message:
                "End date is required unless you are currently working here.",

        });

    }

});

export type ExperienceFormValues =
    z.infer<
        typeof experienceSchema
    >;