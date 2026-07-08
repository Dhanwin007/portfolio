import { create } from "zustand";

import type {
    Education,
    AddEducationPayload,
    UpdateEducationPayload,
} from "@/features/education/types";

import { educationService } from "@/services/education/education.service";

interface EducationState {

    // Dashboard

    educations: Education[];

    // Public Portfolio

    publicEducations: Education[];

    loading: boolean;

    error: string | null;

    fetchEducations: () => Promise<boolean>;

    fetchPublicEducations: (
        username: string
    ) => Promise<boolean>;

    addEducation: (
        payload: AddEducationPayload
    ) => Promise<boolean>;

    updateEducation: (
        payload: UpdateEducationPayload
    ) => Promise<boolean>;

    deleteEducation: (
        id: number
    ) => Promise<boolean>;

    clearEducations: () => void;

    clearPublicEducations: () => void;

    clearError: () => void;

}

export const educationStore =
    create<EducationState>((set) => ({

        educations: [],

        publicEducations: [],

        loading: false,

        error: null,

        async fetchEducations() {

            set({

                loading: true,

                error: null,

            });

            const { data, error } =
                await educationService.fetchEducations();

            if (error) {

                set({

                    loading: false,

                    error: error.message,

                });

                return false;

            }

            set({

                educations:
                    data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async fetchPublicEducations(
            username
        ) {

            set({

                loading: true,

                error: null,

            });

            const { data, error } =
                await educationService.fetchPublicEducations(
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

                publicEducations:
                    data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async addEducation(
            payload
        ) {

            set({

                loading: true,

                error: null,

            });

            const { error } =
                await educationService.addEducation(
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
                await educationService.fetchEducations();

            set({

                educations:
                    refresh.data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async updateEducation(
            payload
        ) {

            set({

                loading: true,

                error: null,

            });

            const { error } =
                await educationService.updateEducation(
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
                await educationService.fetchEducations();

            set({

                educations:
                    refresh.data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        async deleteEducation(
            id
        ) {

            set({

                loading: true,

                error: null,

            });

            const { error } =
                await educationService.deleteEducation(
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
                await educationService.fetchEducations();

            set({

                educations:
                    refresh.data ?? [],

                loading: false,

                error: null,

            });

            return true;

        },

        clearEducations() {

            set({

                educations: [],

            });

        },

        clearPublicEducations() {

            set({

                publicEducations: [],

            });

        },

        clearError() {

            set({

                error: null,

            });

        },

    }));