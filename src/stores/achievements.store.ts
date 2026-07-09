import { create } from "zustand";

import type {
    Achievement,
    AddAchievementPayload,
    UpdateAchievementPayload,
} from "@/features/achievements/types";

import {
    achievementsService,
} from "@/services/achievements/achievements.service";

interface AchievementsState {

    // Dashboard

    achievements: Achievement[];

    // Public Portfolio

    publicAchievements: Achievement[];

    loading: boolean;

    error: string | null;

    fetchAchievements: () => Promise<boolean>;

    fetchPublicAchievements: (
        username: string
    ) => Promise<boolean>;

    addAchievement: (
        payload: AddAchievementPayload
    ) => Promise<boolean>;

    updateAchievement: (
        payload: UpdateAchievementPayload
    ) => Promise<boolean>;

    deleteAchievement: (
        id: string
    ) => Promise<boolean>;

    clearAchievements: () => void;

    clearPublicAchievements: () => void;

    clearError: () => void;

}

export const achievementsStore =
create<AchievementsState>((set) => ({

    achievements: [],

    publicAchievements: [],

    loading: false,

    error: null,

    async fetchAchievements() {

        set({

            loading: true,

            error: null,

        });

        const {

            data,

            error,

        } =
        await achievementsService.fetchAchievements();

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return false;

        }

        set({

            achievements:
                data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async fetchPublicAchievements(
        username
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            data,

            error,

        } =
        await achievementsService.fetchPublicAchievements(
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

            publicAchievements:
                data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async addAchievement(
        payload
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await achievementsService.addAchievement(
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
            await achievementsService.fetchAchievements();

        set({

            achievements:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async updateAchievement(
        payload
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await achievementsService.updateAchievement(
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
            await achievementsService.fetchAchievements();

        set({

            achievements:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async deleteAchievement(
        id
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await achievementsService.deleteAchievement(
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
            await achievementsService.fetchAchievements();

        set({

            achievements:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    clearAchievements() {

        set({

            achievements: [],

        });

    },

    clearPublicAchievements() {

        set({

            publicAchievements: [],

        });

    },

    clearError() {

        set({

            error: null,

        });

    },

}));