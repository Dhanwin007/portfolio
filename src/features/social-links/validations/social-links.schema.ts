import { z } from "zod";

export const socialLinksSchema = z.object({

    github: z.string(),

    linkedin: z.string(),

    portfolio: z.string(),

    leetcode: z.string(),

    codeforces: z.string(),

    hackerrank: z.string(),

    youtube: z.string(),

    twitter: z.string(),

});

export type SocialLinksFormValues =
    z.infer<typeof socialLinksSchema>;