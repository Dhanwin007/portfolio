// src/stores/social-links.store.ts

import { create } from "zustand";

import type {
    SocialLinks,
    UpdateSocialLinksPayload,
} from "@/features/social-links/types";

import { socialLinksService } from "@/services/social-links/social-links.service";

interface SocialLinksState {

    // Dashboard
    socialLinks: SocialLinks | null;

    // Public Portfolio
    publicSocialLinks: SocialLinks | null;

    loading: boolean;

    error: string | null;

    fetchSocialLinks: () => Promise<boolean>;

    fetchPublicSocialLinks: (
        username: string
    ) => Promise<boolean>;

    updateSocialLinks: (
        payload: UpdateSocialLinksPayload
    ) => Promise<boolean>;

    clearSocialLinks: () => void;

    clearPublicSocialLinks: () => void;

    clearError: () => void;

}

export const socialLinksStore =
    create<SocialLinksState>((set) => ({

        socialLinks: null,

        publicSocialLinks: null,

        loading: false,

        error: null,

        async fetchSocialLinks() {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await socialLinksService.getSocialLinks();

            if (error) {

                set({
                    loading: false,
                    error: error.message,
                });

                return false;

            }

            set({
                socialLinks: data,
                loading: false,
                error: null,
            });

            return true;

        },

        async fetchPublicSocialLinks(
            username
        ) {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await socialLinksService.getPublicSocialLinks(
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
                publicSocialLinks: data,
                loading: false,
                error: null,
            });

            return true;

        },

        async updateSocialLinks(
            payload
        ) {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await socialLinksService.updateSocialLinks(
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
                socialLinks: data,
                loading: false,
                error: null,
            });

            return true;

        },

        clearSocialLinks() {

            set({
                socialLinks: null,
            });

        },

        clearPublicSocialLinks() {

            set({
                publicSocialLinks: null,
            });

        },

        clearError() {

            set({
                error: null,
            });

        },

    }));