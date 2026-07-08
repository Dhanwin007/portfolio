import { create } from "zustand";

import type {
    Experience,
    AddExperiencePayload,
    UpdateExperiencePayload,
} from "@/features/experience/types";

import { experienceService } from "@/services/experience/experience.service";

interface ExperienceState {

    // Dashboard

    experiences: Experience[];

    // Public Portfolio

    publicExperiences: Experience[];

    loading: boolean;

    error: string | null;

    fetchExperiences: () => Promise<boolean>;

    fetchPublicExperiences: (
        username: string
    ) => Promise<boolean>;

    addExperience: (
        payload: AddExperiencePayload
    ) => Promise<boolean>;

    updateExperience: (
        payload: UpdateExperiencePayload
    ) => Promise<boolean>;

    deleteExperience: (
        id: string
    ) => Promise<boolean>;

    clearExperiences: () => void;

    clearPublicExperiences: () => void;

    clearError: () => void;

}

export const experienceStore =
    create<ExperienceState>((set) => ({

        experiences: [],

        publicExperiences: [],

        loading: false,

        error: null,

        async fetchExperiences() {

            set({

                loading: true,

                error: null,

            });

            const { data, error } =
                await experienceService.fetchExperiences();

            if (error) {

                set({

                    loading: false,

                    error: error.message,

                });

                return false;

            }

            set({

                experiences:
                    data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async fetchPublicExperiences(
            username
        ) {

            set({

                loading: true,

                error: null,

            });

            const { data, error } =
                await experienceService.fetchPublicExperiences(
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

                publicExperiences:
                    data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async addExperience(
            payload
        ) {

            set({

                loading: true,

                error: null,

            });

            const { error } =
                await experienceService.addExperience(
                    payload
                );

            if (error) {

                set({

                    loading: false,

                    error: error.message,

                });

                return false;

            }

            const refresh =
                await experienceService.fetchExperiences();

            set({

                experiences:
                    refresh.data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async updateExperience(
            payload
        ) {

            set({

                loading: true,

                error: null,

            });

            const { error } =
                await experienceService.updateExperience(
                    payload
                );

            if (error) {

                set({

                    loading: false,

                    error: error.message,

                });

                return false;

            }

            const refresh =
                await experienceService.fetchExperiences();

            set({

                experiences:
                    refresh.data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async deleteExperience(
            id
        ) {

            set({

                loading: true,

                error: null,

            });

            const { error } =
                await experienceService.deleteExperience(
                    id
                );

            if (error) {

                set({

                    loading: false,

                    error: error.message,

                });

                return false;

            }

            const refresh =
                await experienceService.fetchExperiences();

            set({

                experiences:
                    refresh.data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        clearExperiences() {

            set({

                experiences: [],

            });

        },

        clearPublicExperiences() {

            set({

                publicExperiences: [],

            });

        },

        clearError() {

            set({

                error: null,

            });

        },

    }));