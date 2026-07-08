// src/services/skills/skills.service.ts

import { supabase } from "@/lib/supabase/client";

import type {
    Skill,
    AddSkillPayload,
    UpdateSkillPayload
} from "@/features/skills/types";

class SkillsService {

    // ==========================
    // Helpers
    // ==========================

    private async getProfileId() {

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError) {

            return {
                data: null,
                error: authError,
            };

        }

        if (!user) {

            return {
                data: null,
                error: {
                    message: "User not authenticated.",
                },
            };

        }

        return await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", user.id)
            .single();

    }

    private async findOrCreateTechnology(
        name: string
    ) {

        const technologyName =
            name.trim();

        const existing =
            await supabase
                .from("technologies")
                .select("id")
                .ilike(
                    "name",
                    technologyName
                )
                .maybeSingle();

        if (existing.error) {

            return {
                data: null,
                error: existing.error,
            };

        }

        if (existing.data) {

            return {
                data: existing.data,
                error: null,
            };

        }

        return await supabase
            .from("technologies")
            .insert({

                name: technologyName,

            })
            .select("id")
            .single();

    }

    private mapSkills(
        rows: any[]
    ): Skill[] {

        return rows.map(
            (row) => ({

                technology_id:
                    row.technology_id,

                name:
                    row.technologies.name,

                icon:
                    row.technologies.icon,

                website:
                    row.technologies.website,

            })
        );

    }

    // ==========================
    // Dashboard
    // ==========================

    async fetchSkills() {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        const result =
            await supabase

                .from("profile_technologies")

                .select(`

                    technology_id,

                    technologies(

                        name,

                        icon,

                        website

                    )

                `)

                .eq(
                    "profile_id",
                    profile.data.id
                );

        if (result.error) {

            return {

                data: null,

                error: result.error,

            };

        }

        return {

            data: this.mapSkills(
                result.data
            ),

            error: null,

        };

    }

    async addSkill(
        payload: AddSkillPayload
    ) {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                error: profile.error,

            };

        }

        const technology =
            await this.findOrCreateTechnology(
                payload.name
            );

        if (technology.error) {

            return {

                error: technology.error,

            };

        }

        const existingRelation =
            await supabase

                .from("profile_technologies")

                .select("technology_id")

                .eq(
                    "profile_id",
                    profile.data.id
                )

                .eq(
                    "technology_id",
                    technology.data.id
                )

                .maybeSingle();

        if (existingRelation.error) {

            return {

                error:
                    existingRelation.error,

            };

        }

        if (existingRelation.data) {

            return {

                error: null,

            };

        }

        return await supabase

            .from("profile_technologies")

            .insert({

                profile_id:
                    profile.data.id,

                technology_id:
                    technology.data.id,

            });

    }
        async updateSkill(
        payload: UpdateSkillPayload
    ) {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                error: profile.error,

            };

        }

        const technology =
            await this.findOrCreateTechnology(
                payload.newSkillName
            );

        if (technology.error) {

            return {

                error: technology.error,

            };

        }

        const existingRelation =
            await supabase

                .from("profile_technologies")

                .select("technology_id")

                .eq(
                    "profile_id",
                    profile.data.id
                )

                .eq(
                    "technology_id",
                    technology.data.id
                )

                .maybeSingle();

        if (existingRelation.error) {

            return {

                error:
                    existingRelation.error,

            };

        }

        if (existingRelation.data) {

            return await supabase

                .from("profile_technologies")

                .delete()

                .eq(
                    "profile_id",
                    profile.data.id
                )

                .eq(
                    "technology_id",
                    payload.oldTechnologyId
                );

        }

        const deleteResult =
            await supabase

                .from("profile_technologies")

                .delete()

                .eq(
                    "profile_id",
                    profile.data.id
                )

                .eq(
                    "technology_id",
                    payload.oldTechnologyId
                );

        if (deleteResult.error) {

            return {

                error:
                    deleteResult.error,

            };

        }

        return await supabase

            .from("profile_technologies")

            .insert({

                profile_id:
                    profile.data.id,

                technology_id:
                    technology.data.id,

            });

    }

    async deleteSkill(
        technologyId: number
    ) {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                error: profile.error,

            };

        }

        return await supabase

            .from("profile_technologies")

            .delete()

            .eq(
                "profile_id",
                profile.data.id
            )

            .eq(
                "technology_id",
                technologyId
            );

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async fetchPublicSkills(
        username: string
    ) {

        const profile =
            await supabase

                .from("profiles")

                .select("id")

                .eq(
                    "username",
                    username
                )

                .single();

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        const result =
            await supabase

                .from("profile_technologies")

                .select(`

                    technology_id,

                    technologies(

                        name,

                        icon,

                        website

                    )

                `)

                .eq(
                    "profile_id",
                    profile.data.id
                );

        if (result.error) {

            return {

                data: null,

                error: result.error,

            };

        }

        return {

            data:
                this.mapSkills(
                    result.data
                ),

            error: null,

        };

    }

}

export const skillsService =
    new SkillsService();