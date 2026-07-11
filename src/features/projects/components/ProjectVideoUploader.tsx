"use client";

import { useRef } from "react";

import {
    Video,
    Trash2,
    RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { projectsStore } from "@/stores/projects.store";

interface ProjectVideoUploaderProps {

    value: string;

    onChange: (
        url: string
    ) => void;

}

export function ProjectVideoUploader({

    value,

    onChange,

}: ProjectVideoUploaderProps) {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const uploadProjectVideo =
        projectsStore(
            state =>
                state.uploadProjectVideo
        );

    const loading =
        projectsStore(
            state =>
                state.loading
        );

    async function handleFile(
        file: File | null
    ) {

        if (!file) {

            return;

        }

        const url =
            await uploadProjectVideo(
                file
            );

        if (url) {

            onChange(url);

        }

        if (inputRef.current) {

            inputRef.current.value = "";

        }

    }

    function removeVideo() {

        onChange("");

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

                    Demo Video

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

                    <Video
                        className="
                            mr-2
                            h-4
                            w-4
                            text-black
                        "
                    />

                    {

                        value

                            ? "Replace Video"

                            : "Upload Video"

                    }

                </Button>

            </div>

            <input
                ref={inputRef}
                hidden
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={event =>
                    handleFile(
                        event.target.files?.[0] ??
                        null
                    )
                }
            />

            {

                !value ? (

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

                            handleFile(

                                event.dataTransfer
                                    .files?.[0] ??
                                null

                            );

                        }}
                        className="
                            flex
                            h-64
                            w-full
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

                        <Video
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

                            Upload Demo Video

                        </p>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-zinc-400
                            "
                        >

                            Drag & Drop or Click

                        </p>

                    </button>

                ) : (

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-zinc-800
                        "
                    >

                        <video
                            controls
                            preload="metadata"
                            className="
                                w-full
                                bg-black
                            "
                        >

                            <source
                                src={value}
                            />

                        </video>

                        <div
                            className="
                                flex
                                justify-end
                                gap-3
                                border-t
                                border-zinc-800
                                bg-zinc-900
                                p-4
                            "
                        >

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    inputRef.current?.click()
                                }
                            >

                                <RefreshCcw
                                    className="
                                        mr-2
                                        h-4
                                        w-4
                                    "
                                />

                                Replace

                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                onClick={
                                    removeVideo
                                }
                            >

                                <Trash2
                                    className="
                                        mr-2
                                        h-4
                                        w-4
                                    "
                                />

                                Remove

                            </Button>

                        </div>

                    </div>

                )

            }

        </div>

    );

}