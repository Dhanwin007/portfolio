"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { Button } from "@/components/ui/button";

import { EducationCard } from "@/features/education/components/EducationCard";
import { EducationDialog } from "@/features/education/components/EducationDialog";

import type {
    Education,
} from "@/features/education/types";

import { educationStore } from "@/stores/education.store";

export default function EducationPage() {

    const educations =
        educationStore(
            state => state.educations
        );

    const loading =
        educationStore(
            state => state.loading
        );

    const error =
        educationStore(
            state => state.error
        );

    const fetchEducations =
        educationStore(
            state => state.fetchEducations
        );

    const deleteEducation =
        educationStore(
            state => state.deleteEducation
        );

    const [

        open,

        setOpen,

    ] = useState(false);

    const [

        selectedEducation,

        setSelectedEducation,

    ] = useState<
        Education | null
    >(null);

    useEffect(() => {

        fetchEducations();

    }, [fetchEducations]);

    async function handleDelete(
        id: number
    ) {

        if (

            !window.confirm(

                "Delete this education record?"

            )

        ) {

            return;

        }

        const success =
            await deleteEducation(
                id
            );

        if (!success) {

            return;

        }

        toast.success(
            "Education deleted."
        );

    }

    function handleAdd() {

        setSelectedEducation(
            null
        );

        setOpen(true);

    }

    function handleEdit(
        education: Education
    ) {

        setSelectedEducation(
            education
        );

        setOpen(true);

    }

    return (

        <DashboardPage

            title="Education"

            description="Manage your education history."

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

                            Education

                        </h2>

                        <p

                            className="
                                mt-2
                                text-zinc-400
                            "

                        >

                            Showcase your academic journey.

                        </p>

                    </div>

                    <Button

                        onClick={
                            handleAdd
                        }

                    >

                        + Add Education

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

                    ) : educations.length === 0 ? (

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

                                🎓

                            </div>

                            <h3

                                className="
                                    mt-4
                                    text-xl
                                    font-semibold
                                    text-white
                                "

                            >

                                No education added yet

                            </h3>

                            <p

                                className="
                                    mt-2
                                    text-zinc-400
                                "

                            >

                                Click "Add Education"
                                to showcase your
                                academic journey.

                            </p>

                        </div>

                    ) : (

                        <div

                            className="
                                space-y-5
                            "

                        >

                            {

                                educations.map(

                                    education => (

                                        <EducationCard

                                            key={
                                                education.id
                                            }

                                            education={
                                                education
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

            <EducationDialog

                open={open}

                onOpenChange={
                    setOpen
                }

                education={
                    selectedEducation
                }

            />

        </DashboardPage>

    );

}