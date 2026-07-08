import { supabase } from "@/lib/supabase/client";

import type {
    AddEducationPayload,
    UpdateEducationPayload,
} from "@/features/education/types";

class EducationService {

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

    async fetchEducations() {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        return await supabase

            .from("education")

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

    async addEducation(
        payload: AddEducationPayload
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

            .from("education")

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

            .from("education")

            .insert({

                profile_id:
                    profile.data.id,

                ...payload,

                display_order:
                    (count ?? 0) + 1,

            });

    }

    async updateEducation(
        payload: UpdateEducationPayload
    ) {

        const {

            id,

            ...education

        } = payload;

        return await supabase

            .from("education")

            .update(
                education
            )

            .eq(
                "id",
                id
            );

    }

    async deleteEducation(
        id: number
    ) {

        return await supabase

            .from("education")

            .delete()

            .eq(
                "id",
                id
            );

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async fetchPublicEducations(
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

            .from("education")

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

export const educationService =
    new EducationService();