import { supabase } from "@/lib/supabase/client";

import { geocodingService } from "./geocoding.service";

import type {
    UpdateLocationPayload,
} from "@/features/location/types";

class LocationService {

    // ==========================
    // Dashboard
    // ==========================

    async getLocation() {

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

        const profile = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", user.id)
            .single();

        if (profile.error) {
            return {
                data: null,
                error: profile.error,
            };
        }

        return await supabase
            .from("locations")
            .select("*")
            .eq("profile_id", profile.data.id)
            .maybeSingle();

    }

    async updateLocation(
        payload: UpdateLocationPayload
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

        const profile = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", user.id)
            .single();

        if (profile.error) {
            return {
                data: null,
                error: profile.error,
            };
        }

        const coordinates =
            await geocodingService.getCoordinates(
                payload.country,
                payload.state,
                payload.city
            );

        if (!coordinates) {
            return {
                data: null,
                error: {
                    message:
                        "Unable to locate the specified address.",
                },
            };
        }

        return await supabase
            .from("locations")
            .upsert(
                {
                    profile_id: profile.data.id,

                    ...payload,

                    latitude: coordinates.latitude,

                    longitude: coordinates.longitude,
                },
                {
                    onConflict: "profile_id",
                }
            )
            .select()
            .single();

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async getPublicLocation(
        username: string
    ) {

        const profile = await supabase
            .from("profiles")
            .select("id")
            .eq("username", username)
            .single();

        if (profile.error) {
            return {
                data: null,
                error: profile.error,
            };
        }

        return await supabase
            .from("locations")
            .select("*")
            .eq("profile_id", profile.data.id)
            .maybeSingle();

    }

}

export const locationService =
    new LocationService();