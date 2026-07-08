"use client";

import type {
    Education,
} from "../types";

import {

    Dialog,

    DialogContent,

    DialogDescription,

    DialogHeader,

    DialogTitle,

} from "@/components/ui/dialog";

import { EducationForm } from "./EducationForm";

interface EducationDialogProps {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    education?: Education | null;

}

export function EducationDialog({

    open,

    onOpenChange,

    education,

}: EducationDialogProps) {

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

                            education

                                ? "Edit Education"

                                : "Add Education"

                        }

                    </DialogTitle>

                    <DialogDescription

                        className="
                            text-zinc-400
                        "

                    >

                        {

                            education

                                ? "Update your education details."

                                : "Add a new education entry to your portfolio."

                        }

                    </DialogDescription>

                </DialogHeader>

                <EducationForm

                    education={
                        education
                    }

                    onSuccess={() =>
                        onOpenChange(
                            false
                        )
                    }

                />

            </DialogContent>

        </Dialog>

    );

}