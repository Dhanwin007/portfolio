import { supabase } from "@/lib/supabase/client";
import type {
    PortfolioSettings,
    UpdatePortfolioSettingsPayload,
    UploadIntroVideoResponse,
    UploadResumeResponse,
} from "@/features/portfolio-settings/types";

class PortfolioSettingsService {
    private async getProfile() {
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            throw new Error("User not authenticated.");
        }

        const { data: profile, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", user.id)
            .single();

        if (error || !profile) {
            throw new Error("Profile not found.");
        }

        return profile;
    }

    private getStoragePath(publicUrl: string, bucket: string) {
        const index = publicUrl.indexOf(`${bucket}/`);

        if (index === -1) {
            return null;
        }

        return publicUrl.substring(index + bucket.length + 1);
    }

    async fetchPortfolioSettings() {
        const profile = await this.getProfile();

        const { data, error } = await supabase
            .from("portfolio_settings")
            .select("*")
            .eq("profile_id", profile.id)
            .maybeSingle();

        return {
            data: data as PortfolioSettings | null,
            error,
        };
    }

    async updatePortfolioSettings(
        payload: UpdatePortfolioSettingsPayload
    ) {
        const profile = await this.getProfile();

        const { data, error } = await supabase
            .from("portfolio_settings")
            .upsert(
                {
                    profile_id: profile.id,
                    ...payload,
                },
                {
                    onConflict: "profile_id",
                }
            )
            .select()
            .single();

        return {
            data: data as PortfolioSettings,
            error,
        };
    }

    async uploadResume(
        file: File
    ): Promise<UploadResumeResponse> {
        const profile = await this.getProfile();

        const extension = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${extension}`;
        const path = `${profile.id}/${fileName}`;

        const { error } = await supabase.storage
            .from("resumes")
            .upload(path, file);

        if (error) {
            throw error;
        }

        const { data } = supabase.storage
            .from("resumes")
            .getPublicUrl(path);

        return {
            url: data.publicUrl,
        };
    }
        async uploadIntroVideo(
        file: File
    ): Promise<UploadIntroVideoResponse> {
        const profile = await this.getProfile();

        const extension = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${extension}`;
        const path = `${profile.id}/${fileName}`;

        const { error } = await supabase.storage
            .from("intro-videos")
            .upload(path, file);

        if (error) {
            throw error;
        }

        const { data } = supabase.storage
            .from("intro-videos")
            .getPublicUrl(path);

        return {
            url: data.publicUrl,
        };
    }

    async deleteResume(publicUrl: string) {
        const path = this.getStoragePath(
            publicUrl,
            "resumes"
        );

        if (!path) {
            return;
        }

        const { error } = await supabase.storage
            .from("resumes")
            .remove([path]);

        if (error) {
            throw error;
        }
    }

    async deleteIntroVideo(publicUrl: string) {
        const path = this.getStoragePath(
            publicUrl,
            "intro-videos"
        );

        if (!path) {
            return;
        }

        const { error } = await supabase.storage
            .from("intro-videos")
            .remove([path]);

        if (error) {
            throw error;
        }
    }
}

export const portfolioSettingsService =
    new PortfolioSettingsService();