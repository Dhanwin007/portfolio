"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    experienceSchema,
    type ExperienceFormValues,
} from "../validations/experience.schema";

import type {
    Experience,
} from "../types";

import { experienceStore } from "@/stores/experience.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceFormProps {

    experience?: Experience | null;

    onSuccess: () => void;

}

export function ExperienceForm({

    experience,

    onSuccess,

}: ExperienceFormProps) {

    const addExperience =
        experienceStore(
            state => state.addExperience
        );

    const updateExperience =
        experienceStore(
            state => state.updateExperience
        );

    const loading =
        experienceStore(
            state => state.loading
        );

    const error =
        experienceStore(
            state => state.error
        );

    const clearError =
        experienceStore(
            state => state.clearError
        );

    const {

        register,

        watch,

        reset,

        handleSubmit,

        formState: {

            errors,

        },

    } = useForm<ExperienceFormValues>({

        resolver:
            zodResolver(
                experienceSchema
            ),

        defaultValues: {

            company: "",

            position: "",

            employment_type:
                "full_time",

            location: "",

            start_date: "",

            end_date: "",

            currently_working: false,

            description: "",

        },

    });

    const currentlyWorking =
        watch(
            "currently_working"
        );

    useEffect(() => {

        if (!experience) {

            reset();

            return;

        }

        reset({

            company:
                experience.company,

            position:
                experience.position,

            employment_type:
                experience.employment_type,

            location:
                experience.location ?? "",

            start_date:
                experience.start_date ?? "",

            end_date:
                experience.end_date ?? "",

            currently_working:
                experience.currently_working,

            description:
                experience.description ?? "",

        });

    }, [

        experience,

        reset,

    ]);

    const onSubmit:
        SubmitHandler<
            ExperienceFormValues
        > = async (data) => {

        clearError();

        const success =
            experience

                ? await updateExperience({

                    id:
                        experience.id,

                    ...data,

                })

                : await addExperience(
                    data
                );

        if (!success) {

            return;

        }

        toast.success(

            experience

                ? "Experience updated."

                : "Experience added."

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

            <div className="grid gap-6 md:grid-cols-2">

                <div className="space-y-2">

                    <Label>

                        Company

                    </Label>

                    <Input

                        {

                            ...register(
                                "company"
                            )

                        }

                    />

                    {

                        errors.company && (

                            <p className="text-sm text-red-400">

                                {

                                    errors.company.message

                                }

                            </p>

                        )

                    }

                </div>

                <div className="space-y-2">

                    <Label>

                        Position

                    </Label>

                    <Input

                        {

                            ...register(
                                "position"
                            )

                        }

                    />

                    {

                        errors.position && (

                            <p className="text-sm text-red-400">

                                {

                                    errors.position.message

                                }

                            </p>

                        )

                    }

                </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <div className="space-y-2">

                    <Label>

                        Employment Type

                    </Label>

                    <select

                        {

                            ...register(
                                "employment_type"
                            )

                        }

                        className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-zinc-900
                            px-4
                            text-white
                        "

                    >

                        <option value="full_time">Full Time</option>

                        <option value="part_time">Part Time</option>

                        <option value="internship">Internship</option>

                        <option value="contract">Contract</option>

                        <option value="freelance">Freelance</option>

                        <option value="self_employed">Self Employed</option>

                        <option value="temporary">Temporary</option>

                        <option value="volunteer">Volunteer</option>

                        <option value="other">Other</option>

                    </select>

                </div>

                <div className="space-y-2">

                    <Label>

                        Location

                    </Label>

                    <Input

                        {

                            ...register(
                                "location"
                            )

                        }

                    />

                </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <div className="space-y-2">

                    <Label>

                        Start Date

                    </Label>

                    <Input

                        type="date"

                        {

                            ...register(
                                "start_date"
                            )

                        }

                    />

                </div>

                <div className="space-y-2">

                    <Label>

                        End Date

                    </Label>

                    <Input

                        type="date"

                        disabled={
                            currentlyWorking
                        }

                        {

                            ...register(
                                "end_date"
                            )

                        }

                    />

                </div>

            </div>

            <div className="flex items-center gap-3">

                <input

                    type="checkbox"

                    {

                        ...register(
                            "currently_working"
                        )

                    }

                />

                <Label>

                    I currently work here

                </Label>

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

                            : experience

                                ? "Update Experience"

                                : "Add Experience"

                    }

                </Button>

            </div>

        </form>

    );

}