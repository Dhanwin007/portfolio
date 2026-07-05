import { supabase } from "@/lib/supabase/client";

import type {
    UpdateProfilePayload,
} from "@/features/profile/types";

class ProfileService {

    // ==========================
    // Dashboard
    // ==========================

    async getProfile() {

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
                error: new Error("User not authenticated."),
            };
        }

        return await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

    }

    async updateProfile(
        payload: UpdateProfilePayload
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
                error: new Error("User not authenticated."),
            };
        }

        return await supabase
            .from("profiles")
            .update(payload)
            .eq("user_id", user.id)
            .select()
            .single();

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async getPublicProfile(
        username: string
    ) {

        return await supabase
            .from("profiles")
            .select("*")
            .eq("username", username)
            .single();

    }

    // ==========================
    // Storage
    // ==========================

    async uploadAvatar(
        file: File
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
                error: new Error("User not authenticated."),
            };
        }

       const extension =
    file.name.split(".").pop();

const fileName =
    `avatar-${Date.now()}.${extension}`;

const path =
    `${user.id}/${fileName}`;
        const upload =
            await supabase.storage
                .from("avatars")
                .upload(path, file, {
                    upsert: true,
                });

        if (upload.error) {
            return {
                data: null,
                error: upload.error,
            };
        }

        const { data } =
            supabase.storage
                .from("avatars")
                .getPublicUrl(path);

        return await supabase
            .from("profiles")
            .update({
                avatar_url: data.publicUrl,
            })
            .eq("user_id", user.id)
            .select()
            .single();

    }

    async uploadCover(
        file: File
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
                error: new Error("User not authenticated."),
            };
        }

          const extension =
    file.name.split(".").pop();

const fileName =
    `avatar-${Date.now()}.${extension}`;

const path =
    `${user.id}/${fileName}`;

        const upload =
            await supabase.storage
                .from("covers")
                .upload(path, file, {
                    upsert: true,
                });

        if (upload.error) {
            return {
                data: null,
                error: upload.error,
            };
        }

        const { data } =
            supabase.storage
                .from("covers")
                .getPublicUrl(path);

        return await supabase
            .from("profiles")
            .update({
                cover_url: data.publicUrl,
            })
            .eq("user_id", user.id)
            .select()
            .single();

    }

}

export const profileService =
    new ProfileService();