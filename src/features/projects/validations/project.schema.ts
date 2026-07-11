import { z } from "zod";
import type { Technology } from "../types";

export const projectSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Project title is required.")
        .max(150, "Project title must be at most 150 characters."),

    short_description: z
        .string()
        .trim()
        .max(300, "Short description must be at most 300 characters."),

    full_description: z
        .string()
        .trim(),

    github_url: z
        .string()
        .url("Enter a valid GitHub URL.")
        .or(z.literal("")),

    live_demo_url: z
        .string()
        .url("Enter a valid Live Demo URL.")
        .or(z.literal("")),

    demo_video_url: z
        .string()
        .url("Enter a valid Demo Video URL.")
        .or(z.literal("")),

    featured: z.boolean(),

    media: z.array(z.string()),
    
    technologies: z.array(z.custom<Technology>()),
});

// Automatically infer the TypeScript interface from the schema
export type ProjectFormValues = z.infer<typeof projectSchema>;