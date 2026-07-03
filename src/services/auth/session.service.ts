import { supabase } from "@/lib/supabase/client";

class SessionService {

    async getSession() {
        return await supabase.auth.getSession();
    }

    async getUser() {
        return await supabase.auth.getUser();
    }

    onAuthStateChange(
        callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]
    ) {
        return supabase.auth.onAuthStateChange(callback);
    }
}

export const sessionService = new SessionService();