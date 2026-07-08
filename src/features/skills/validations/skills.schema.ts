import { z } from "zod";

export const addSkillSchema = z.object({

    name: z
        .string()
        .trim()
        .min(
            1,
            "Skill name is required."
        )
        .max(
            100,
            "Skill name cannot exceed 100 characters."
        ),

});

export const updateSkillSchema = z.object({

    oldTechnologyId: z
        .number(),

    newSkillName: z
        .string()
        .trim()
        .min(
            1,
            "Skill name is required."
        )
        .max(
            100,
            "Skill name cannot exceed 100 characters."
        ),

});

export type AddSkillFormValues =
    z.infer<
        typeof addSkillSchema
    >;

export type UpdateSkillFormValues =
    z.infer<
        typeof updateSkillSchema
    >;