"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    educationSchema,
    type EducationFormValues,
} from "../validations/education.schema";

import type {
    Education,
} from "../types";

import { educationStore } from "@/stores/education.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EducationFormProps {

    education?: Education | null;

    onSuccess: () => void;

}

export function EducationForm({

    education,

    onSuccess,

}: EducationFormProps) {

    const addEducation =
        educationStore(
            state => state.addEducation
        );

    const updateEducation =
        educationStore(
            state => state.updateEducation
        );

    const loading =
        educationStore(
            state => state.loading
        );

    const error =
        educationStore(
            state => state.error
        );

    const clearError =
        educationStore(
            state => state.clearError
        );

    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors,

        },

    } = useForm<EducationFormValues>({

        resolver:
            zodResolver(
                educationSchema
            ),

        defaultValues: {

            institution: "",

            degree: "",

            field: "",

            grade: "",

            start_date: "",

            end_date: "",

            description: "",

        },

    });

    useEffect(() => {

        if (!education) {

            reset({

                institution: "",

                degree: "",

                field: "",

                grade: "",

                start_date: "",

                end_date: "",

                description: "",

            });

            return;

        }

        reset({

            institution:
                education.institution,

            degree:
                education.degree,

            field:
                education.field ?? "",

            grade:
                education.grade ?? "",

            start_date:
                education.start_date ?? "",

            end_date:
                education.end_date ?? "",

            description:
                education.description ?? "",

        });

    }, [education, reset]);

    const onSubmit:
        SubmitHandler<
            EducationFormValues
        > = async (data) => {

        clearError();

        const success =
            education

                ? await updateEducation({

                    id: education.id,

                    ...data,

                })

                : await addEducation(
                    data
                );

        if (!success) {

            return;

        }

        toast.success(

            education

                ? "Education updated."

                : "Education added."

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

                    Institution

                </Label>

                <Input

                    {...register(
                        "institution"
                    )}

                />

                {

                    errors.institution && (

                        <p className="text-sm text-red-400">

                            {

                                errors
                                    .institution
                                    .message

                            }

                        </p>

                    )

                }

            </div>

            <div className="space-y-2">

                <Label>

                    Degree

                </Label>

                <Input

                    {...register(
                        "degree"
                    )}

                />

                {

                    errors.degree && (

                        <p className="text-sm text-red-400">

                            {

                                errors
                                    .degree
                                    .message

                            }

                        </p>

                    )

                }

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <div className="space-y-2">

                    <Label>

                        Field

                    </Label>

                    <Input

                        {...register(
                            "field"
                        )}

                    />

                </div>

                <div className="space-y-2">

                    <Label>

                        Grade

                    </Label>

                    <Input

                        {...register(
                            "grade"
                        )}

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

                        {...register(
                            "start_date"
                        )}

                    />

                </div>

                <div className="space-y-2">

                    <Label>

                        End Date

                    </Label>

                    <Input

                        type="date"

                        {...register(
                            "end_date"
                        )}

                    />

                </div>

            </div>

            <div className="space-y-2">

                <Label>

                    Description

                </Label>

                <Textarea

                    rows={5}

                    {...register(
                        "description"
                    )}

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

                            : education

                                ? "Update Education"

                                : "Add Education"

                    }

                </Button>

            </div>

        </form>

    );

}