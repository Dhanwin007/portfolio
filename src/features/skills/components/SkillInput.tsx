"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    addSkillSchema,
    type AddSkillFormValues,
} from "../validations/skills.schema";

import { skillsStore } from "@/stores/skills.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SkillInput() {

    const addSkill =
        skillsStore(
            state => state.addSkill
        );

    const loading =
        skillsStore(
            state => state.loading
        );

    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors,

        },

    } = useForm<AddSkillFormValues>({

        resolver:
            zodResolver(
                addSkillSchema
            ),

        defaultValues: {

            name: "",

        },

    });

    const onSubmit =
        async (
            data: AddSkillFormValues
        ) => {

            const success =
                await addSkill(data);

            if (!success) return;

            toast.success(
                "Skill added successfully."
            );

            reset();

        };

    return (

        <form

            onSubmit={
                handleSubmit(
                    onSubmit
                )
            }

            className="
                flex
                gap-3
            "

        >

            <div className="flex-1 text-white">

                <Input

                    placeholder="Add a skill..."

                    {

                        ...register(
                            "name"
                        )

                    }

                />

                {

                    errors.name && (

                        <p
                            className="
                                mt-2
                                text-sm
                                text-red-400
                            "
                        >

                            {

                                errors
                                    .name
                                    .message

                            }

                        </p>

                    )

                }

            </div>

            <Button

                type="submit"

                disabled={loading}
                className="bg-blue-500
                    text-white
                "

            >

                Add Skill

            </Button>

        </form>

    );

}