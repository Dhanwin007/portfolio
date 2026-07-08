"use client";

import { useEffect } from "react";

import { SkillInput } from "./SkillInput";
import { SkillCard } from "./SkillCard";

import { skillsStore } from "@/stores/skills.store";

export function SkillsForm() {

    const skills =
        skillsStore(
            state => state.skills
        );

    const loading =
        skillsStore(
            state => state.loading
        );

    const error =
        skillsStore(
            state => state.error
        );

    const fetchSkills =
        skillsStore(
            state => state.fetchSkills
        );

    useEffect(() => {

        fetchSkills();

    }, [fetchSkills]);

    return (

        <div

            className="
                space-y-8

                rounded-3xl

                border

                border-white/10

                bg-white/5

                p-8
            "

        >

            <div>

                <h2

                    className="
                        text-2xl
                        font-semibold
                        text-white
                    "

                >

                    Skills

                </h2>

                <p

                    className="
                        mt-2
                        text-zinc-400
                    "

                >

                    Add, edit and manage the
                    technologies you want to
                    showcase on your portfolio.

                </p>

            </div>

            <SkillInput />

            {

                error && (

                    <p
                        className="
                            text-red-400
                        "
                    >

                        {error}

                    </p>

                )

            }

            {

                loading ? (

                    <p
                        className="
                            text-zinc-400
                        "
                    >

                        Loading skills...

                    </p>

                ) : skills.length === 0 ? (

                    <div

                        className="
                            rounded-xl

                            border

                            border-dashed

                            border-white/10

                            p-10

                            text-center

                            text-zinc-400
                        "

                    >

                        No skills added yet.

                    </div>

                ) : (

                    <div

                        className="
                            space-y-4
                        "

                    >

                        {

                            skills.map(

                                skill => (

                                    <SkillCard

                                        key={
                                            skill.technology_id
                                        }

                                        skill={
                                            skill
                                        }

                                    />

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}