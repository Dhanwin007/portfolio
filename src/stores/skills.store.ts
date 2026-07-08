// src/stores/skills.store.ts

import { create } from "zustand";

import type {
    Skill,
    AddSkillPayload,
    UpdateSkillPayload,
} from "@/features/skills/types";

import { skillsService } from "@/services/skills/skills.service";

interface SkillsState {

    // Dashboard

    skills: Skill[];

    // Public Portfolio

    publicSkills: Skill[];

    loading: boolean;

    error: string | null;

    fetchSkills: () => Promise<boolean>;

    fetchPublicSkills: (
        username: string
    ) => Promise<boolean>;

    addSkill: (
        payload: AddSkillPayload
    ) => Promise<boolean>;

    updateSkill: (
        payload: UpdateSkillPayload
    ) => Promise<boolean>;

    deleteSkill: (
        technologyId: number
    ) => Promise<boolean>;

    clearSkills: () => void;

    clearPublicSkills: () => void;

    clearError: () => void;

}

export const skillsStore =
    create<SkillsState>((set) => ({

        skills: [],

        publicSkills: [],

        loading: false,

        error: null,

        async fetchSkills() {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await skillsService.fetchSkills();

            if (error) {

                set({
                    loading: false,
                    error: error.message,
                });

                return false;

            }

            set({
                skills: data ?? [],
                loading: false,
                error: null,
            });

            return true;

        },

        async fetchPublicSkills(
            username
        ) {

            set({
                loading: true,
                error: null,
            });

            const { data, error } =
                await skillsService.fetchPublicSkills(
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
                publicSkills: data ?? [],
                loading: false,
                error: null,
            });

            return true;

        },

        async addSkill(
            payload
        ) {

            set({
                loading: true,
                error: null,
            });

            const { error } =
                await skillsService.addSkill(
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
                await skillsService.fetchSkills();

            set({
                skills:
                    refresh.data ?? [],
                loading: false,
                error: null,
            });

            return true;

        },

        async updateSkill(
            payload
        ) {

            set({
                loading: true,
                error: null,
            });

            const { error } =
                await skillsService.updateSkill(
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
                await skillsService.fetchSkills();

            set({
                skills:
                    refresh.data ?? [],
                loading: false,
                error: null,
            });

            return true;

        },

        async deleteSkill(
            technologyId
        ) {

            set({
                loading: true,
                error: null,
            });

            const { error } =
                await skillsService.deleteSkill(
                    technologyId
                );

            if (error) {

                set({
                    loading: false,
                    error: error.message,
                });

                return false;

            }

            const refresh =
                await skillsService.fetchSkills();

            set({
                skills:
                    refresh.data ?? [],
                loading: false,
                error: null,
            });

            return true;

        },

        clearSkills() {

            set({
                skills: [],
            });

        },

        clearPublicSkills() {

            set({
                publicSkills: [],
            });

        },

        clearError() {

            set({
                error: null,
            });

        },

    }));