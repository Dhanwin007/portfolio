"use client";

import type {
    Project,
} from "../types";

import {

    Dialog,

    DialogContent,

    DialogDescription,

    DialogHeader,

    DialogTitle,

} from "@/components/ui/dialog";

import { ProjectForm } from "./ProjectForm";

interface ProjectDialogProps {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    project?: Project | null;

}

export function ProjectDialog({

    open,

    onOpenChange,

    project,

}: ProjectDialogProps) {

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent

                className="
                    max-h-[90vh]
                    overflow-y-auto
                    border-white/10
                    bg-zinc-950
                    text-white
                    sm:max-w-5xl
                "

            >

                <DialogHeader>

                    <DialogTitle>

                        {

                            project

                                ? "Edit Project"

                                : "Add Project"

                        }

                    </DialogTitle>

                    <DialogDescription

                        className="text-zinc-400"

                    >

                        {

                            project

                                ? "Update your project details."

                                : "Add a new project to your portfolio."

                        }

                    </DialogDescription>

                </DialogHeader>

                <ProjectForm

                    project={project}

                    onSuccess={() =>

                        onOpenChange(false)

                    }

                />

            </DialogContent>

        </Dialog>

    );

}