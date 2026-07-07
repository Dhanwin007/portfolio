import { z } from "zod";

export const locationSchema = z.object({

    country: z.string(),

    state: z.string(),

    city: z.string(),

});

export type LocationFormValues =
    z.infer<typeof locationSchema>;