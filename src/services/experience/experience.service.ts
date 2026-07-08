import { supabase } from "@/lib/supabase/client";

import type {
    AddExperiencePayload,
    UpdateExperiencePayload,
} from "@/features/experience/types";

class ExperienceService {

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

                    message:
                        "User not authenticated.",

                },

            };

        }

        return await supabase

            .from("profiles")

            .select("id")

            .eq(
                "user_id",
                user.id
            )

            .single();

    }

    // ==========================
    // Dashboard
    // ==========================

    async fetchExperiences() {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        return await supabase

            .from("experience")

            .select("*")

            .eq(
                "profile_id",
                profile.data.id
            )

            .order(
                "display_order",
                {
                    ascending: true,
                }
            );

    }

    async addExperience(
        payload: AddExperiencePayload
    ) {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                error: profile.error,

            };

        }

        const {
            count,
            error: countError,
        } = await supabase

            .from("experience")

            .select("*", {

                count: "exact",

                head: true,

            })

            .eq(
                "profile_id",
                profile.data.id
            );

        if (countError) {

            return {

                error: countError,

            };

        }

        return await supabase

            .from("experience")

            .insert({

                profile_id:
                    profile.data.id,

                ...payload,

                display_order:
                    (count ?? 0) + 1,

            });

    }

    async updateExperience(
        payload: UpdateExperiencePayload
    ) {

        const {

            id,

            ...experience

        } = payload;

        return await supabase

            .from("experience")

            .update(
                experience
            )

            .eq(
                "id",
                id
            );

    }

    async deleteExperience(
        id: string
    ) {

        return await supabase

            .from("experience")

            .delete()

            .eq(
                "id",
                id
            );

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async fetchPublicExperiences(
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

        return await supabase

            .from("experience")

            .select("*")

            .eq(
                "profile_id",
                profile.data.id
            )

            .order(
                "display_order",
                {
                    ascending: true,
                }
            );

    }

}

export const experienceService =
    new ExperienceService();