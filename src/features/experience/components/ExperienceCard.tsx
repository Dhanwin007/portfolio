"use client";

import type {
    Experience,
} from "../types";

import { Button } from "@/components/ui/button";

interface ExperienceCardProps {

    experience: Experience;

    onEdit: (
        experience: Experience
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

export function ExperienceCard({

    experience,

    onEdit,

    onDelete,

}: ExperienceCardProps) {

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

                <div className="space-y-2 flex-1">

                    <h3

                        className="
                            text-xl
                            font-semibold
                            text-white
                        "

                    >

                        {experience.position}

                    </h3>

                    <p className="text-zinc-300">

                        {experience.company}

                    </p>

                    {

                        experience.location && (

                            <p className="text-zinc-400">

                                📍 {experience.location}

                            </p>

                        )

                    }

                    <div className="flex gap-3 flex-wrap">

                        <span

                            className="
                                rounded-full
                                bg-violet-600/20
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-violet-300
                            "

                        >

                            {experience.employment_type.replaceAll("_", " ")}

                        </span>

                    </div>

                    <p className="text-sm text-zinc-500">

                        {experience.start_date || "N/A"}

                        {" - "}

                        {

                            experience.currently_working

                                ? "Present"

                                : experience.end_date || "N/A"

                        }

                    </p>

                    {

                        experience.description && (

                            <p

                                className="
                                    pt-2
                                    text-sm
                                    leading-7
                                    text-zinc-400
                                "

                            >

                                {experience.description}

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
                            onEdit(experience)
                        }

                    >

                        Edit

                    </Button>

                    <Button

                        variant="destructive"

                        onClick={() =>
                            onDelete(experience.id)
                        }

                    >

                        Delete

                    </Button>

                </div>

            </div>

        </div>

    );

}