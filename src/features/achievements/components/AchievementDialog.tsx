"use client";

import type {
    Achievement,
} from "../types";

import {

    Dialog,

    DialogContent,

    DialogDescription,

    DialogHeader,

    DialogTitle,

} from "@/components/ui/dialog";

import { AchievementForm } from "./AchievementForm";

interface AchievementDialogProps {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    achievement?: Achievement | null;

}

export function AchievementDialog({

    open,

    onOpenChange,

    achievement,

}: AchievementDialogProps) {

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

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

                            achievement

                                ? "Edit Achievement"

                                : "Add Achievement"

                        }

                    </DialogTitle>

                    <DialogDescription

                        className="text-zinc-400"

                    >

                        {

                            achievement

                                ? "Update your achievement."

                                : "Add a new achievement."

                        }

                    </DialogDescription>

                </DialogHeader>

                <AchievementForm

                    achievement={achievement}

                    onSuccess={() =>
                        onOpenChange(false)
                    }

                />

            </DialogContent>

        </Dialog>

    );

}