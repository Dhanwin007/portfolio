"use client";

import type {
    Achievement,
} from "../types";

import { Button } from "@/components/ui/button";

interface AchievementCardProps {

    achievement: Achievement;

    onEdit: (
        achievement: Achievement
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

export function AchievementCard({

    achievement,

    onEdit,

    onDelete,

}: AchievementCardProps) {

    return (

        <div

            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                transition-all
                duration-300
                hover:border-violet-500/40
                hover:bg-white/10
            "

        >

            <div

                className="
                    flex
                    items-start
                    justify-between
                    gap-6
                "

            >

                <div className="flex-1 space-y-2">

                    <h3

                        className="
                            text-xl
                            font-semibold
                            text-white
                        "

                    >

                        {achievement.title}

                    </h3>

                    {

                        achievement.achievement_date && (

                            <p className="text-sm text-zinc-500">

                                {achievement.achievement_date}

                            </p>

                        )

                    }

                    {

                        achievement.description && (

                            <p

                                className="
                                    pt-2
                                    text-sm
                                    leading-7
                                    text-zinc-400
                                "

                            >

                                {achievement.description}

                            </p>

                        )

                    }

                </div>

                <div

                    className="
                        flex
                        flex-col
                        gap-3
                    "

                >

                    <Button

                        onClick={() =>
                            onEdit(
                                achievement
                            )
                        }

                    >

                        Edit

                    </Button>

                    <Button

                        variant="destructive"

                        onClick={() =>
                            onDelete(
                                achievement.id
                            )
                        }

                    >

                        Delete

                    </Button>

                </div>

            </div>

        </div>

    );

}