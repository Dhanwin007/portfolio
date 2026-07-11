"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    projectSchema,
    type ProjectFormValues,
} from "../validations/project.schema";

import type {
    Project,
    Technology,
} from "../types";

import { projectsStore } from "@/stores/projects.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { TechnologySelector } from "./TechnologySelector";
import { ProjectMediaUploader } from "./ProjectMediaUploader";
import { ProjectVideoUploader } from "./ProjectVideoUploader";

interface ProjectFormProps {

    project?: Project | null;

    onSuccess: () => void;

}

export function ProjectForm({

    project,

    onSuccess,

}: ProjectFormProps) {

    const addProject =
        projectsStore(
            state => state.addProject
        );

    const updateProject =
        projectsStore(
            state => state.updateProject
        );

    const loading =
        projectsStore(
            state => state.loading
        );

    const error =
        projectsStore(
            state => state.error
        );

    const clearError =
        projectsStore(
            state => state.clearError
        );

    const {

        register,

        reset,

        watch,

        setValue,

        handleSubmit,

        formState: {

            errors,

        },

    } = useForm<ProjectFormValues>({

        resolver:
            zodResolver(
                projectSchema
            ),

        defaultValues: {

            title: "",

            short_description: "",

            full_description: "",

            github_url: "",

            live_demo_url: "",

            demo_video_url: "",

            featured: false,

            technologies: [],

            media: [],

        },

    });

    useEffect(() => {

        if (!project) {

            reset({

                title: "",

                short_description: "",

                full_description: "",

                github_url: "",

                live_demo_url: "",

                demo_video_url: "",

                featured: false,

                technologies: [],

                media: [],

            });

            return;

        }

        reset({

            title:
                project.title,

            short_description:
                project.short_description ?? "",

            full_description:
                project.full_description ?? "",

            github_url:
                project.github_url ?? "",

            live_demo_url:
                project.live_demo_url ?? "",

            demo_video_url:
                project.demo_video_url ?? "",

            featured:
                project.featured,

            technologies:
                project.technologies,

            media:
                project.media.map(

                    item =>

                        item.image_url

                ),

        });

    }, [

        project,

        reset,

    ]);

    const onSubmit:
        SubmitHandler<ProjectFormValues> =
    async (data) => {

        clearError();

        const payload = {

            ...data,

            technologies:

                data.technologies.map(

                    (

                        technology: Technology

                    ) =>

                        technology.id

                ),

        };

        const success =

            project

                ? await updateProject({

                    id:
                        project.id,

                    ...payload,

                })

                : await addProject(

                    payload

                );

        if (!success) {

            return;

        }

        toast.success(

            project

                ? "Project updated."

                : "Project added."

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

            className="space-y-8"

        ><div className="space-y-2">

    <Label>

        Project Title

    </Label>

    <Input

        {...register(
            "title"
        )}

        placeholder="Portfolio Builder"

    />

    {

        errors.title && (

            <p className="text-sm text-red-400">

                {errors.title.message}

            </p>

        )

    }

</div>

<div className="space-y-2">

    <Label>

        Short Description

    </Label>

    <Textarea

        rows={3}

        placeholder="A brief overview of your project..."

        {...register(
            "short_description"
        )}

    />

    {

        errors.short_description && (

            <p className="text-sm text-red-400">

                {

                    errors.short_description.message

                }

            </p>

        )

    }

</div>

<div className="space-y-2">

    <Label>

        Full Description

    </Label>

    <Textarea

        rows={8}

        placeholder="Explain your project in detail..."

        {...register(
            "full_description"
        )}

    />

    {

        errors.full_description && (

            <p className="text-sm text-red-400">

                {

                    errors.full_description.message

                }

            </p>

        )

    }

</div>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2">

    <div className="space-y-2">

        <Label>

            GitHub Repository

        </Label>

        <Input

            placeholder="https://github.com/..."

            {...register(
                "github_url"
            )}

        />

        {

            errors.github_url && (

                <p className="text-sm text-red-400">

                    {

                        errors.github_url.message

                    }

                </p>

            )

        }

    </div>

    <div className="space-y-2">

        <Label>

            Live Demo

        </Label>

        <Input

            placeholder="https://..."

            {...register(
                "live_demo_url"
            )}

        />

        {

            errors.live_demo_url && (

                <p className="text-sm text-red-400">

                    {

                        errors.live_demo_url.message

                    }

                </p>

            )

        }

    </div>

</div>

<div

    className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-white/10
        p-4
    "

>

    <div>

        <Label>

            Featured Project

        </Label>

        <p

            className="
                mt-1
                text-sm
                text-zinc-400
            "

        >

            Highlight this project on your portfolio.

        </p>

    </div>

    <Switch

        checked={

            watch(
                "featured"
            )

        }

        onCheckedChange={checked =>

            setValue(

                "featured",

                checked,

                {

                    shouldDirty: true,

                    shouldValidate: true,

                }

            )

        }

    />

</div>

<TechnologySelector

    value={

        watch(
            "technologies"
        )

    }

    onChange={technologies =>

        setValue(

            "technologies",

            technologies,

            {

                shouldDirty: true,

                shouldValidate: true,

            }

        )

    }

/>

<ProjectMediaUploader

    value={

        watch(
            "media"
        )

    }

    onChange={media =>

        setValue(

            "media",

            media,

            {

                shouldDirty: true,

                shouldValidate: true,

            }

        )

    }

/>

<ProjectVideoUploader

    value={

        watch(
            "demo_video_url"
        )

    }

    onChange={url =>

        setValue(

            "demo_video_url",

            url,

            {

                shouldDirty: true,

                shouldValidate: true,

            }

        )

    }

/>
            {

                error && (

                    <p

                        className="
                            rounded-lg
                            border
                            border-red-500/20
                            bg-red-500/10
                            p-3
                            text-sm
                            text-red-400
                        "

                    >

                        {error}

                    </p>

                )

            }

            <div

                className="
                    flex
                    justify-end
                "

            >

                <Button

                    type="submit"

                    disabled={loading}

                    className="min-w-36"

                >

                    {

                        loading

                            ? "Saving..."

                            : project

                                ? "Update Project"

                                : "Add Project"

                    }

                </Button>

            </div>

        </form>

    );

}