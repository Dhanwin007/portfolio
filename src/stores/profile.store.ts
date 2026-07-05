// src/stores/profile.store.ts

import { create } from "zustand";

import type {
    Profile,
    UpdateProfilePayload,
} from "@/features/profile/types";

import { profileService } from "@/services/profile/profile.service";

interface ProfileState {

    // Dashboard Profile
    profile: Profile | null;

    // Public Portfolio Profile
    publicProfile: Profile | null;

    loading: boolean;

    error: string | null;

    fetchProfile: () => Promise<boolean>;

    fetchPublicProfile: (
        username: string
    ) => Promise<boolean>;

    updateProfile: (
        payload: UpdateProfilePayload
    ) => Promise<boolean>;

    uploadAvatar: (
        file: File
    ) => Promise<boolean>;

    uploadCover: (
        file: File
    ) => Promise<boolean>;

    clearProfile: () => void;

    clearPublicProfile: () => void;

    clearError: () => void;

}

export const profileStore =
    create<ProfileState>((set) => ({

        profile: null,

        publicProfile: null,

        loading: false,

        error: null,

        async fetchProfile() {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await profileService.getProfile();

            if (error) {

                set({
                    loading: false,
                    error: error.message,
                });

                return false;

            }

            set({
                profile: data,
                loading: false,
                error: null,
            });

            return true;

        },

        async fetchPublicProfile(
            username
        ) {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await profileService.getPublicProfile(
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
                publicProfile: data,
                loading: false,
                error: null,
            });

            return true;

        },

        async updateProfile(
            payload
        ) {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await profileService.updateProfile(
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
                profile: data,
                loading: false,
                error: null,
            });

            return true;

        },

        async uploadAvatar(
            file
        ) {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await profileService.uploadAvatar(
                    file
                );

            if (error) {

                set({
                    loading: false,
                    error: error.message,
                });

                return false;

            }

            set({
                profile: data,
                loading: false,
                error: null,
            });

            return true;

        },

        async uploadCover(
            file
        ) {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await profileService.uploadCover(
                    file
                );

            if (error) {

                set({
                    loading: false,
                    error: error.message,
                });

                return false;

            }

            set({
                profile: data,
                loading: false,
                error: null,
            });

            return true;

        },

        clearProfile() {

            set({
                profile: null,
            });

        },

        clearPublicProfile() {

            set({
                publicProfile: null,
            });

        },

        clearError() {

            set({
                error: null,
            });

        },

    }));