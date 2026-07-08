"use client";

import type {
    Education,
} from "../types";

import { Button } from "@/components/ui/button";

interface EducationCardProps {

    education: Education;

    onEdit: (
        education: Education
    ) => void;

    onDelete: (
        id: number
    ) => void;

}

export function EducationCard({

    education,

    onEdit,

    onDelete,

}: EducationCardProps) {

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

                        {education.degree}

                    </h3>

                    <p className="text-zinc-300">

                        {education.institution}

                    </p>

                    {

                        education.field && (

                            <p className="text-zinc-400">

                                {education.field}

                            </p>

                        )

                    }

                    <p className="text-sm text-zinc-500">

                        {

                            education.start_date ||

                            "N/A"

                        }

                        {" - "}

                        {

                            education.end_date ||

                            "Present"

                        }

                    </p>

                    {

                        education.grade && (

                            <p className="text-sm text-zinc-400">

                                Grade : {education.grade}

                            </p>

                        )

                    }

                    {

                        education.description && (

                            <p

                                className="
                                    pt-2
                                    text-sm
                                    leading-7
                                    text-zinc-400
                                "

                            >

                                {

                                    education.description

                                }

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
                                education
                            )
                        }
                        className="bg-zinc-800/50
                            text-white
                            hover:bg-zinc-800/70
                        bg-blue-500/50"

                    >

                        Edit

                    </Button>

                    <Button

                        variant="destructive"

                        onClick={() =>
                            onDelete(
                                education.id
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