"use client";

import type {
    Experience,
} from "../types";

import {

    Dialog,

    DialogContent,

    DialogDescription,

    DialogHeader,

    DialogTitle,

} from "@/components/ui/dialog";

import { ExperienceForm } from "./ExperienceForm";

interface ExperienceDialogProps {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    experience?: Experience | null;

}

export function ExperienceDialog({

    open,

    onOpenChange,

    experience,

}: ExperienceDialogProps) {

    return (

        <Dialog

            open={open}

            onOpenChange={
                onOpenChange
            }

        >

            <DialogContent

                className="
                    border-white/10
                    bg-zinc-950
                    text-white
                    sm:max-w-3xl
                "

            >

                <DialogHeader>

                    <DialogTitle>

                        {

                            experience

                                ? "Edit Experience"

                                : "Add Experience"

                        }

                    </DialogTitle>

                    <DialogDescription
                        className="text-zinc-400"
                    >

                        {

                            experience

                                ? "Update your work experience."

                                : "Add a new work experience."

                        }

                    </DialogDescription>

                </DialogHeader>

                <ExperienceForm

                    experience={
                        experience
                    }

                    onSuccess={() =>
                        onOpenChange(false)
                    }

                />

            </DialogContent>

        </Dialog>

    );

}