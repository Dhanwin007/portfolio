import { create } from "zustand";
import { portfolioSettingsService } from "@/services/portfolio-settings/portfolio-settings.service";
import type { PortfolioSettings, UpdatePortfolioSettingsPayload } from "@/features/portfolio-settings/types";

interface PortfolioSettingsStore {
    settings: PortfolioSettings | null;
    loading: boolean;
    error: string | null;
    fetchPortfolioSettings: () => Promise<void>;
    updatePortfolioSettings: (payload: UpdatePortfolioSettingsPayload) => Promise<boolean>;
    uploadResume: (file: File) => Promise<string>;
    uploadIntroVideo: (file: File) => Promise<string>;
    deleteResume: (publicUrl: string) => Promise<void>;
    deleteIntroVideo: (publicUrl: string) => Promise<void>;
    clearSettings: () => void;
    clearError: () => void;
}

export const usePortfolioSettingsStore = create<PortfolioSettingsStore>((set) => ({
    settings: null,
    loading: false,
    error: null,
    fetchPortfolioSettings: async () => {
        set({
            loading: true,
            error: null,
        });
        try {
            const { data, error } = await portfolioSettingsService.fetchPortfolioSettings();
            if (error) {
                throw error;
            }
            set({
                settings: data,
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : "Failed to fetch portfolio settings.",
            });
        }
    },
    updatePortfolioSettings: async (payload) => {
        set({
            loading: true,
            error: null,
        });
        try {
            const { data, error } = await portfolioSettingsService.updatePortfolioSettings(payload);
            if (error) {
                throw error;
            }
            set({
                settings: data,
                loading: false,
            });
            return true;
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : "Failed to update portfolio settings.",
            });
            return false;
        }
    },
    uploadResume: async (file) => {
        const { url } = await portfolioSettingsService.uploadResume(file);
        return url;
    },
    uploadIntroVideo: async (file) => {
        const { url } = await portfolioSettingsService.uploadIntroVideo(file);
        return url;
    },
    deleteResume: async (publicUrl) => {
        await portfolioSettingsService.deleteResume(publicUrl);
    },
    deleteIntroVideo: async (publicUrl) => {
        await portfolioSettingsService.deleteIntroVideo(publicUrl);
    },
    clearSettings: () => {
        set({
            settings: null,
        });
    },
    clearError: () => {
        set({
            error: null,
        });
    },
}));