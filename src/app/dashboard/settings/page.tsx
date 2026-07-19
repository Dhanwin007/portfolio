"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import PortfolioSettingsCard from "@/features/portfolio-settings/components/PortfolioSettingsCard";
import { usePortfolioSettingsStore } from "@/stores/portfolio-settings.store";
import type { UpdatePortfolioSettingsPayload } from "@/features/portfolio-settings/types";

export default function PortfolioSettingsPage() {
    const {
        settings,
        loading,
        fetchPortfolioSettings,
        updatePortfolioSettings,
    } = usePortfolioSettingsStore();

    useEffect(() => {
        fetchPortfolioSettings();
    }, [fetchPortfolioSettings]);

    const handleSubmit = async (
        values: UpdatePortfolioSettingsPayload
    ) => {
        return await updatePortfolioSettings(values);
    };

    if (loading && !settings) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-5xl py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Portfolio Settings
                </h1>

                <p className="mt-2 text-muted-foreground text-blue-400">
                    Manage your portfolio appearance, resume and intro video.
                </p>
            </div>

            <PortfolioSettingsCard
                settings={settings}
                onSubmit={handleSubmit}
            />
        </div>
    );
}