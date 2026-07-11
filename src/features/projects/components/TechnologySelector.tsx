"use client";

import { useState } from "react";

import { Loader2, Plus, X } from "lucide-react";

import type {
    Technology,
} from "../types";

import { projectsStore } from "@/stores/projects.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TechnologySelectorProps {

    value: Technology[];

    onChange: (
        technologies: Technology[]
    ) => void;

}

export function TechnologySelector({

    value,

    onChange,

}: TechnologySelectorProps) {

    const [

        technology,

        setTechnology,

    ] = useState("");

    const [

        adding,

        setAdding,

    ] = useState(false);

    const createTechnology =
        projectsStore(
            state => state.createTechnology
        );

    async function handleAdd() {

        const name =
            technology.trim();

        if (!name || adding) {

            return;

        }

        setAdding(true);

        try {

            const created =
                await createTechnology(
                    name
                );

            if (!created) {

                return;

            }

            const exists =
                value.some(

                    item =>

                        item.id ===
                        created.id

                );

            if (!exists) {

                onChange([

                    ...value,

                    created,

                ]);

            }

            setTechnology("");

        } finally {

            setAdding(false);

        }

    }

    function removeTechnology(
        id: string
    ) {

        onChange(

            value.filter(

                technology =>

                    technology.id !== id

            )

        );

    }

    return (

        <div className="space-y-4">

            <Label>

                Technologies

            </Label>

            <div className="flex gap-3">

                <Input

                    value={technology}

                    placeholder="React"

                    disabled={adding}

                    onChange={(event) =>

                        setTechnology(
                            event.target.value
                        )

                    }

                    onKeyDown={async event => {

                        if (

                            event.key !== "Enter"

                        ) {

                            return;

                        }

                        event.preventDefault();

                        await handleAdd();

                    }}

                />

                <Button

                    type="button"

                    disabled={
                        adding ||
                        !technology.trim()
                    }

                    onClick={handleAdd}

                >

                    {

                        adding ? (

                            <Loader2

                                className="
                                    h-4
                                    w-4
                                    animate-spin
                                "

                            />

                        ) : (

                            <>

                                <Plus

                                    className="
                                        mr-2
                                        h-4
                                        w-4
                                    "

                                />

                                Add

                            </>

                        )

                    }

                </Button>

            </div>

            {

                value.length === 0 ? (

                    <div

                        className="
                            rounded-xl
                            border
                            border-dashed
                            border-zinc-700
                            p-6
                            text-center
                            text-sm
                            text-zinc-400
                        "

                    >

                        No technologies added yet.

                    </div>

                ) : (

                    <div

                        className="
                            flex
                            flex-wrap
                            gap-2
                        "

                    >

                        {

                            value.map(

                                technology => (

                                    <div

                                        key={
                                            technology.id
                                        }

                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-violet-500/30
                                            bg-violet-500/10
                                            px-4
                                            py-2
                                            text-sm
                                        "

                                    >

                                        <span>

                                            {

                                                technology.name

                                            }

                                        </span>

                                        <button

                                            type="button"

                                            onClick={() =>

                                                removeTechnology(

                                                    technology.id

                                                )

                                            }

                                            className="
                                                rounded-full
                                                p-0.5
                                                transition-colors
                                                hover:bg-red-500/20
                                                hover:text-red-400
                                            "

                                        >

                                            <X

                                                className="
                                                    h-4
                                                    w-4
                                                "

                                            />

                                        </button>

                                    </div>

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}