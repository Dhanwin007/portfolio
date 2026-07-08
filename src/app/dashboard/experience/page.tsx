"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { Button } from "@/components/ui/button";

import { ExperienceCard } from "@/features/experience/components/ExperienceCard";
import { ExperienceDialog } from "@/features/experience/components/ExperienceDialog";

import type {
    Experience,
} from "@/features/experience/types";

import { experienceStore } from "@/stores/experience.store";

export default function ExperiencePage() {

    const experiences =
        experienceStore(
            (state) => state.experiences
        );

    const loading =
        experienceStore(
            (state) => state.loading
        );

    const error =
        experienceStore(
            (state) => state.error
        );

    const fetchExperiences =
        experienceStore(
            (state) => state.fetchExperiences
        );

    const deleteExperience =
        experienceStore(
            (state) => state.deleteExperience
        );

    const [

        open,

        setOpen,

    ] = useState(false);

    const [

        selectedExperience,

        setSelectedExperience,

    ] = useState<
        Experience | null
    >(null);

    useEffect(() => {

        fetchExperiences();

    }, [fetchExperiences]);

    async function handleDelete(
        id: string
    ) {

        if (

            !window.confirm(
                "Delete this experience?"
            )

        ) {

            return;

        }

        const success =
            await deleteExperience(
                id
            );

        if (!success) {

            return;

        }

        toast.success(
            "Experience deleted."
        );

    }

    function handleAdd() {

        setSelectedExperience(
            null
        );

        setOpen(true);

    }

    function handleEdit(
        experience: Experience
    ) {

        setSelectedExperience(
            experience
        );

        setOpen(true);

    }

    return (

        <DashboardPage

            title="Experience"

            description="Manage your professional experience."

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

                            Experience

                        </h2>

                        <p

                            className="
                                mt-2
                                text-zinc-400
                            "

                        >

                            Showcase your professional journey.

                        </p>

                    </div>

                    <Button

                        onClick={
                            handleAdd
                        }

                    >

                        + Add Experience

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

                    ) : experiences.length === 0 ? (

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

                                💼

                            </div>

                            <h3

                                className="
                                    mt-4
                                    text-xl
                                    font-semibold
                                    text-white
                                "

                            >

                                No experience added yet

                            </h3>

                            <p

                                className="
                                    mt-2
                                    text-zinc-400
                                "

                            >

                                Click "Add Experience"
                                to showcase your
                                professional journey.

                            </p>

                        </div>

                    ) : (

                        <div

                            className="
                                space-y-5
                            "

                        >

                            {

                                experiences.map(

                                    (

                                        experience

                                    ) => (

                                        <ExperienceCard

                                            key={
                                                experience.id
                                            }

                                            experience={
                                                experience
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

            <ExperienceDialog

                open={open}

                onOpenChange={
                    setOpen
                }

                experience={
                    selectedExperience
                }

            />

        </DashboardPage>

    );

}