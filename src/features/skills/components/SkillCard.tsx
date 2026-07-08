"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type {
    Skill,
} from "../types";

import { skillsStore } from "@/stores/skills.store";

interface SkillCardProps {

    skill: Skill;

}

export function SkillCard({

    skill,

}: SkillCardProps) {

    const [

        editing,

        setEditing,

    ] = useState(false);

    const [

        value,

        setValue,

    ] = useState(
        skill.name
    );

    const updateSkill =
        skillsStore(
            state =>
                state.updateSkill
        );

    const deleteSkill =
        skillsStore(
            state =>
                state.deleteSkill
        );

    async function handleUpdate() {

        const success =
            await updateSkill({

                oldTechnologyId:
                    skill.technology_id,

                newSkillName:
                    value,

            });

        if (!success) return;

        toast.success(
            "Skill updated."
        );

        setEditing(false);

    }

    async function handleDelete() {

        const success =
            await deleteSkill(
                skill.technology_id
            );

        if (!success) return;

        toast.success(
            "Skill removed."
        );

    }

    return (

        <div

            className="
                flex
                items-center
                justify-between

                rounded-xl

                border

                border-white/10

                bg-white/5
                text-white

                

                p-4
            "

        >

            {

                editing ? (

                    <Input

                        value={value}

                        onChange={e =>
                            setValue(
                                e.target.value
                            )
                        }

                    />

                ) : (

                    <span>

                        {skill.name}

                    </span>

                )

            }

            <div

                className="
                    flex
                    gap-2
                    
                    
                "

            >

                {

                    editing ? (

                        <Button

                            onClick={
                                handleUpdate
                            }
                            className="bg-green-500
                                text-white
                            "
                        >

                            Save

                        </Button>

                    ) : (

                        <Button

                            onClick={() =>
                                setEditing(
                                    true
                                )
                            }

                            variant="secondary"

                        >

                            Edit

                        </Button>

                    )

                }

                <Button

                    variant="destructive"

                    onClick={
                        handleDelete
                    }

                >

                    Delete

                </Button>

            </div>

        </div>

    );

}