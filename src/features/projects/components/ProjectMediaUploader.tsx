"use client";

import { useRef } from "react";

import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { projectsStore } from "@/stores/projects.store";

interface ProjectMediaUploaderProps {

    value: string[];

    onChange: (
        media: string[]
    ) => void;

}

export function ProjectMediaUploader({

    value,

    onChange,

}: ProjectMediaUploaderProps) {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const uploadProjectImage =
        projectsStore(

            state =>
                state.uploadProjectImage

        );

    const loading =
        projectsStore(

            state =>
                state.loading

        );

    async function handleFiles(

        files: FileList | null

    ) {

        if (!files) {

            return;

        }

        const uploaded: string[] = [];

        for (

            const file

            of Array.from(files)

        ) {

            const url =
                await uploadProjectImage(
                    file
                );

            if (url) {

                uploaded.push(url);

            }

        }

        if (

            uploaded.length > 0

        ) {

            onChange([

                ...value,

                ...uploaded,

            ]);

        }

        if (

            inputRef.current

        ) {

            inputRef.current.value = "";

        }

    }

    function removeImage(

        index: number

    ) {

        onChange(

            value.filter(

                (

                    _,

                    current

                ) =>

                    current !== index

            )

        );

    }

    return (

        <div className="space-y-5">

            <div

                className="
                    flex
                    items-center
                    justify-between
                "

            >

                <h3

                    className="
                        text-lg
                        font-semibold
                    "

                >

                    Project Images

                </h3>

                <Button

                    type="button"

                    variant="outline"
                    className="text-black"

                    disabled={loading}

                    onClick={() =>

                        inputRef.current?.click()

                    }

                >

                    <ImagePlus

                        className="
                            mr-2
                            h-4
                            w-4
                            text-black
                        "

                    />

                    Upload Images

                </Button>

            </div>

            <input

                ref={inputRef}

                type="file"

                hidden

                multiple

                accept="image/*"

                onChange={event =>

                    handleFiles(

                        event.target.files

                    )

                }

            />            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >

                {value.length === 0 ? (

                    <button
                        type="button"
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        onDragOver={event =>
                            event.preventDefault()
                        }
                        onDrop={event => {
                            event.preventDefault();
                            handleFiles(
                                event.dataTransfer.files
                            );
                        }}
                        className="
                            col-span-full
                            flex
                            h-56
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border-2
                            border-dashed
                            border-zinc-700
                            bg-zinc-900/50
                            transition-colors
                            hover:border-violet-500
                            hover:bg-zinc-900
                        "
                    >

                        <ImagePlus
                            className="
                                mb-4
                                h-10
                                w-10
                                text-zinc-500
                            "
                        />

                        <p
                            className="
                                text-base
                                font-medium
                                text-white
                            "
                        >
                            Upload project images
                        </p>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-zinc-400
                            "
                        >
                            Click or drag images here
                        </p>

                    </button>

                ) : (

                    value.map((
                        image,
                        index
                    ) => (

                        <div
                            key={`${image}-${index}`}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-zinc-800
                            "
                        >

                            <img
                                src={image}
                                alt={`Project ${index + 1}`}
                                className="
                                    h-56
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-black/60
                                    opacity-0
                                    transition-opacity
                                    duration-300
                                    group-hover:opacity-100
                                "
                            >

                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                        removeImage(index)
                                    }
                                >

                                    <Trash2
                                        className="
                                            h-4
                                            w-4
                                        "
                                    />

                                </Button>

                            </div>

                        </div>

                    ))

                )}

            </div>

            {value.length > 0 && (

                <button
                    type="button"
                    onClick={() =>
                        inputRef.current?.click()
                    }
                    onDragOver={event =>
                        event.preventDefault()
                    }
                    onDrop={event => {
                        event.preventDefault();
                        handleFiles(
                            event.dataTransfer.files
                        );
                    }}
                    className="
                        flex
                        h-36
                        w-full
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border-2
                        border-dashed
                        border-zinc-700
                        bg-zinc-900/40
                        transition-colors
                        hover:border-violet-500
                        hover:bg-zinc-900
                    "
                >

                    <ImagePlus
                        className="
                            mb-3
                            h-8
                            w-8
                            text-zinc-500
                        "
                    />

                    <p
                        className="
                            font-medium
                            text-white
                        "
                    >
                        Add More Images
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-zinc-400"
                        >
                        Click or drag more files here
                    </p>

                </button>

            )}

        </div>

    );

}