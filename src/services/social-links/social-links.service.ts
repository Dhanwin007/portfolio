// src/services/social-links/social-links.service.ts

import { supabase } from "@/lib/supabase/client";

import type {
    SocialLinks,
    UpdateSocialLinksPayload,
} from "@/features/social-links/types";

class SocialLinksService {

    // ==========================
    // Dashboard
    // ==========================

    async getSocialLinks() {

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
                error: null,
            };

        }

        return await supabase
            .from("social_links")
            .select("*")
            .eq(
                "profile_id",

                (
                    await supabase
                        .from("profiles")
                        .select("id")
                        .eq("user_id", user.id)
                        .single()
                ).data?.id
            )
            .single();

    }

    async updateSocialLinks(
        payload: UpdateSocialLinksPayload
    ) {

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
                error: null,
            };

        }

        const profile =
            await supabase
                .from("profiles")
                .select("id")
                .eq(
                    "user_id",
                    user.id
                )
                .single();

        if (profile.error) {

            return {
                data: null,
                error: profile.error,
            };

        }

        return await supabase
            .from("social_links")
            .update(payload)
            .eq(
                "profile_id",
                profile.data.id
            )
            .select()
            .single();

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async getPublicSocialLinks(
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
            .from("social_links")
            .select("*")
            .eq(
                "profile_id",
                profile.data.id
            )
            .single();

    }

}

export const socialLinksService =
    new SocialLinksService();