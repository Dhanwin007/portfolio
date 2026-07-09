"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { Button } from "@/components/ui/button";

import { AchievementCard } from "@/features/achievements/components/AchievementCard";
import { AchievementDialog } from "@/features/achievements/components/AchievementDialog";

import type {
    Achievement,
} from "@/features/achievements/types";

import { achievementsStore } from "@/stores/achievements.store";

export default function AchievementsPage() {

    const achievements =
        achievementsStore(
            state => state.achievements
        );

    const loading =
        achievementsStore(
            state => state.loading
        );

    const error =
        achievementsStore(
            state => state.error
        );

    const fetchAchievements =
        achievementsStore(
            state => state.fetchAchievements
        );

    const deleteAchievement =
        achievementsStore(
            state => state.deleteAchievement
        );

    const [

        open,

        setOpen,

    ] = useState(false);

    const [

        selectedAchievement,

        setSelectedAchievement,

    ] = useState<
        Achievement | null
    >(null);

    useEffect(() => {

        fetchAchievements();

    }, [fetchAchievements]);

    async function handleDelete(
        id: string
    ) {

        if (

            !window.confirm(
                "Delete this achievement?"
            )

        ) {

            return;

        }

        const success =
            await deleteAchievement(
                id
            );

        if (!success) {

            return;

        }

        toast.success(
            "Achievement deleted."
        );

    }

    function handleAdd() {

        setSelectedAchievement(
            null
        );

        setOpen(true);

    }

    function handleEdit(
        achievement: Achievement
    ) {

        setSelectedAchievement(
            achievement
        );

        setOpen(true);

    }

    return (

        <DashboardPage

            title="Achievements"

            description="Manage your achievements and accomplishments."

        >

            <div

                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-8
                "

            >

                <div

                    className="
                        mb-8
                        flex
                        items-center
                        justify-between
                    "

                >

                    <div>

                        <h2

                            className="
                                text-2xl
                                font-semibold
                                text-white
                            "

                        >

                            Achievements

                        </h2>

                        <p

                            className="
                                mt-2
                                text-zinc-400
                            "

                        >

                            Showcase awards, milestones and accomplishments.

                        </p>

                    </div>

                    <Button

                        onClick={
                            handleAdd
                        }

                    >

                        + Add Achievement

                    </Button>

                </div>

                {

                    loading ? (

                        <p className="text-zinc-400">

                            Loading...

                        </p>

                    ) : error ? (

                        <p className="text-red-400">

                            {error}

                        </p>

                    ) : achievements.length === 0 ? (

                        <div

                            className="
                                rounded-2xl
                                border
                                border-dashed
                                border-white/10
                                py-16
                                text-center
                            "

                        >

                            <div className="text-5xl">

                                🏆

                            </div>

                            <h3

                                className="
                                    mt-4
                                    text-xl
                                    font-semibold
                                    text-white
                                "

                            >

                                No achievements added yet

                            </h3>

                            <p

                                className="
                                    mt-2
                                    text-zinc-400
                                "

                            >

                                Click "Add Achievement"
                                to showcase your
                                accomplishments.

                            </p>

                        </div>

                    ) : (

                        <div

                            className="
                                space-y-5
                            "

                        >

                            {

                                achievements.map(

                                    achievement => (

                                        <AchievementCard

                                            key={
                                                achievement.id
                                            }

                                            achievement={
                                                achievement
                                            }

                                            onEdit={
                                                handleEdit
                                            }

                                            onDelete={
                                                handleDelete
                                            }

                                        />

                                    )

                                )

                            }

                        </div>

                    )

                }

            </div>

            <AchievementDialog

                open={open}

                onOpenChange={
                    setOpen
                }

                achievement={
                    selectedAchievement
                }

            />

        </DashboardPage>

    );

}