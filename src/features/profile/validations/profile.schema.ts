// src/features/profile/validations/profile.schema.ts

import { z } from "zod";

export const profileSchema = z.object({

    display_name:
        z.string().trim().min(
            1,
            "Display name is required."
        ),

    headline:
        z.string(),

    bio:
        z.string(),

    current_status:
        z.enum([
            "available",
            "open_to_work",
            "open_to_internship",
            "freelancing",
            "busy",
        ]),

    is_published:
        z.boolean(),

});

export type ProfileFormValues =
    z.infer<typeof profileSchema>;