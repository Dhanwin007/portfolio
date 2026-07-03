import { supabase } from "@/lib/supabase/client";

class OAuthService {
    async signInWithGoogle() {
        return await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    }

    async signInWithGithub() {
        return await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    }
}

export const oauthService = new OAuthService();