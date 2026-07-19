import { z } from "zod";

export const portfolioSettingsSchema = z.object({

    theme: z.enum([
        "light",
        "dark",
        "system",
    ]),

    resume_url: z.union([

        z.literal(""),

        z.string().url(
            "Enter a valid resume URL."
        ),

    ]),

    intro_video_url: z.union([

        z.literal(""),

        z.string().url(
            "Enter a valid intro video URL."
        ),

    ]),

    allow_resume_download: z.boolean(),

    allow_messages: z.boolean(),

    show_location: z.boolean(),

});

export type PortfolioSettingsFormValues =
    z.infer<
        typeof portfolioSettingsSchema
    >;