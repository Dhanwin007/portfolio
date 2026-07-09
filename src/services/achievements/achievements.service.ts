import { supabase } from "@/lib/supabase/client";

import type {
    AddAchievementPayload,
    UpdateAchievementPayload,
} from "@/features/achievements/types";

class AchievementsService {

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

    async fetchAchievements() {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        return await supabase

            .from("achievements")

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

    async addAchievement(
        payload: AddAchievementPayload
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

            .from("achievements")

            .select("*", {

                head: true,

                count: "exact",

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

            .from("achievements")

            .insert({

                profile_id:
                    profile.data.id,

                ...payload,

                display_order:
                    (count ?? 0) + 1,

            });

    }

    async updateAchievement(
        payload: UpdateAchievementPayload
    ) {

        const {

            id,

            ...achievement

        } = payload;

        return await supabase

            .from("achievements")

            .update(
                achievement
            )

            .eq(
                "id",
                id
            );

    }

    async deleteAchievement(
        id: string
    ) {

        return await supabase

            .from("achievements")

            .delete()

            .eq(
                "id",
                id
            );

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async fetchPublicAchievements(
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

            .from("achievements")

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

export const achievementsService =
    new AchievementsService();