"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import type {
    Project,
} from "@/features/projects/types";

import { projectsStore } from "@/stores/projects.store";

import { Button } from "@/components/ui/button";

import {
    ProjectCard,
} from "@/features/projects/components/ProjectCard";

import {
    ProjectDialog,
} from "@/features/projects/components/ProjectDialog";

export default function ProjectsPage() {

    const projects =
        projectsStore(
            state => state.projects
        );

    const loading =
        projectsStore(
            state => state.loading
        );

    const fetchProjects =
        projectsStore(
            state => state.fetchProjects
        );

    const deleteProject =
        projectsStore(
            state => state.deleteProject
        );

    const [

        dialogOpen,

        setDialogOpen,

    ] = useState(false);

    const [

        selectedProject,

        setSelectedProject,

    ] = useState<Project | null>(
        null
    );

    useEffect(() => {

        fetchProjects();

    }, [

        fetchProjects,

    ]);

    function handleAdd() {

        setSelectedProject(
            null
        );

        setDialogOpen(true);

    }

    function handleEdit(
        project: Project
    ) {

        setSelectedProject(
            project
        );

        setDialogOpen(true);

    }

    async function handleDelete(
        id: string
    ) {

        const confirmed =
            window.confirm(

                "Delete this project?"

            );

        if (!confirmed) {

            return;

        }

        await deleteProject(
            id
        );

    }

    return (

        <div className="space-y-8">

            <div

                className="
                    flex
                    items-center
                    justify-between
                "

            >

                <div>

                    <h1

                        className="
                            text-3xl
                            font-bold
                        "

                    >

                        Projects

                    </h1>

                    <p

                        className="
                            mt-2
                            text-zinc-400
                        "

                    >

                        Showcase your best work.

                    </p>

                </div>

                <Button

                    onClick={
                        handleAdd
                    }

                >

                    <Plus

                        className="
                            mr-2
                            h-4
                            w-4
                        "

                    />

                    Add Project

                </Button>

            </div>

            <ProjectDialog

                open={dialogOpen}

                onOpenChange={
                    setDialogOpen
                }

                project={
                    selectedProject
                }

            />
                        {

                loading ? (

                    <div

                        className="
                            flex
                            items-center
                            justify-center
                            py-20
                            text-zinc-400
                        "

                    >

                        Loading projects...

                    </div>

                ) : projects.length === 0 ? (

                    <div

                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-white/10
                            py-20
                            text-center
                        "

                    >

                        <h2

                            className="
                                text-xl
                                font-semibold
                            "

                        >

                            No Projects Yet

                        </h2>

                        <p

                            className="
                                mt-2
                                text-zinc-400
                            "

                        >

                            Start building your portfolio by adding your first project.

                        </p>

                        <Button

                            className="mt-6"

                            onClick={
                                handleAdd
                            }

                        >

                            <Plus

                                className="
                                    mr-2
                                    h-4
                                    w-4
                                "

                            />

                            Add Project

                        </Button>

                    </div>

                ) : (

                    <div

                        className="
                            grid
                            grid-cols-1
                            gap-6
                            xl:grid-cols-2
                        "

                    >

                        {

                            projects.map(

                                project => (

                                    <ProjectCard

                                        key={
                                            project.id
                                        }

                                        project={
                                            project
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

    );

}