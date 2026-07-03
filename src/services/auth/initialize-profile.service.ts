import { supabase } from "@/lib/supabase/client";

interface InitializeProfileData {
    userId: string;
    username: string;
    displayName: string;
}

class ProfileInitService {

    async initializeProfile({
        userId,
        username,
        displayName,
    }: InitializeProfileData) {

        // Create profile
        const {
            data: profile,
            error: profileError,
        } = await supabase
            .from("profiles")
            .insert({
                user_id: userId,
                username,
                display_name: displayName,
            })
            .select("id")
            .single();

        if (profileError || !profile) {
            return {
                success: false,
                error: profileError,
            };
        }

        // Create default portfolio settings
        const { error: settingsError } = await supabase
            .from("portfolio_settings")
            .insert({
                profile_id: profile.id,
            });

        if (settingsError) {
            return {
                success: false,
                error: settingsError,
            };
        }

        // Create default social links
        const { error: socialError } = await supabase
            .from("social_links")
            .insert({
                profile_id: profile.id,
            });

        if (socialError) {
            return {
                success: false,
                error: socialError,
            };
        }

        return {
            success: true,
            profileId: profile.id,
        };
    }
}

export const profileInitService = new ProfileInitService();