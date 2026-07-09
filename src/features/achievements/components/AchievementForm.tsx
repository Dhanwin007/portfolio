"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    achievementSchema,
    type AchievementFormValues,
} from "../validations/achievement.schema";

import type {
    Achievement,
} from "../types";

import { achievementsStore } from "@/stores/achievements.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AchievementFormProps {

    achievement?: Achievement | null;

    onSuccess: () => void;

}

export function AchievementForm({

    achievement,

    onSuccess,

}: AchievementFormProps) {

    const addAchievement =
        achievementsStore(
            state => state.addAchievement
        );

    const updateAchievement =
        achievementsStore(
            state => state.updateAchievement
        );

    const loading =
        achievementsStore(
            state => state.loading
        );

    const error =
        achievementsStore(
            state => state.error
        );

    const clearError =
        achievementsStore(
            state => state.clearError
        );

    const {

        register,

        reset,

        handleSubmit,

        formState: {

            errors,

        },

    } = useForm<AchievementFormValues>({

        resolver:
            zodResolver(
                achievementSchema
            ),

        defaultValues: {

            title: "",

            description: "",

            achievement_date: "",

        },

    });

    useEffect(() => {

        if (!achievement) {

            reset({

                title: "",

                description: "",

                achievement_date: "",

            });

            return;

        }

        reset({

            title:
                achievement.title,

            description:
                achievement.description ?? "",

            achievement_date:
                achievement.achievement_date ?? "",

        });

    }, [

        achievement,

        reset,

    ]);

    const onSubmit:
        SubmitHandler<
            AchievementFormValues
        > = async (data) => {

        clearError();

        const success =
            achievement

                ? await updateAchievement({

                    id:
                        achievement.id,

                    ...data,

                })

                : await addAchievement(
                    data
                );

        if (!success) {

            return;

        }

        toast.success(

            achievement

                ? "Achievement updated."

                : "Achievement added."

        );

        onSuccess();

    };

    return (

        <form

            onSubmit={
                handleSubmit(
                    onSubmit
                )
            }

            className="space-y-6"

        >

            <div className="space-y-2">

                <Label>

                    Achievement Title

                </Label>

                <Input

                    {

                        ...register(
                            "title"
                        )

                    }

                />

                {

                    errors.title && (

                        <p className="text-sm text-red-400">

                            {

                                errors.title.message

                            }

                        </p>

                    )

                }

            </div>

            <div className="space-y-2">

                <Label>

                    Achievement Date

                </Label>

                <Input

                    type="date"

                    {

                        ...register(
                            "achievement_date"
                        )

                    }

                />

                {

                    errors.achievement_date && (

                        <p className="text-sm text-red-400">

                            {

                                errors.achievement_date.message

                            }

                        </p>

                    )

                }

            </div>

            <div className="space-y-2">

                <Label>

                    Description

                </Label>

                <Textarea

                    rows={5}

                    {

                        ...register(
                            "description"
                        )

                    }

                />

                {

                    errors.description && (

                        <p className="text-sm text-red-400">

                            {

                                errors.description.message

                            }

                        </p>

                    )

                }

            </div>

            {

                error && (

                    <p className="text-red-400">

                        {error}

                    </p>

                )

            }

            <div className="flex justify-end">

                <Button

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Saving..."

                            : achievement

                                ? "Update Achievement"

                                : "Add Achievement"

                    }

                </Button>

            </div>

        </form>

    );

}