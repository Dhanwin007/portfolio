import { create } from "zustand";

import type {
    Location,
    UpdateLocationPayload,
} from "@/features/location/types";

import { locationService } from "@/services/location/location.service";

interface LocationState {

    // Dashboard
    location: Location | null;

    // Public Portfolio
    publicLocation: Location | null;

    loading: boolean;

    error: string | null;

    fetchLocation: () => Promise<boolean>;

    fetchPublicLocation: (
        username: string
    ) => Promise<boolean>;

    updateLocation: (
        payload: UpdateLocationPayload
    ) => Promise<boolean>;

    clearLocation: () => void;

    clearPublicLocation: () => void;

    clearError: () => void;

}

export const locationStore =
    create<LocationState>((set) => ({

        location: null,

        publicLocation: null,

        loading: false,

        error: null,

        async fetchLocation() {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await locationService.getLocation();

            if (error) {

                set({
                    loading: false,
                    error: error.message,
                });

                return false;

            }

            set({

                location: data,

                loading: false,

                error: null,

            });

            return true;

        },

        async fetchPublicLocation(
            username
        ) {

            set({

                loading: true,

                error: null,

            });

            const { data, error } =
                await locationService.getPublicLocation(
                    username
                );

            if (error) {

                set({

                    loading: false,

                    error: error.message,

                });

                return false;

            }

            set({

                publicLocation: data,

                loading: false,

                error: null,

            });

            return true;

        },

        async updateLocation(
            payload
        ) {

            set({

                loading: true,

                error: null,

            });

            const { data, error } =
                await locationService.updateLocation(
                    payload
                );

            if (error) {

                set({

                    loading: false,

                    error: error.message,

                });

                return false;

            }

            set({

                location: data,

                loading: false,

                error: null,

            });

            return true;

        },

        clearLocation() {

            set({

                location: null,

            });

        },

        clearPublicLocation() {

            set({

                publicLocation: null,

            });

        },

        clearError() {

            set({

                error: null,

            });

        },

    }));