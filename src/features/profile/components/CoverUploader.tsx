"use client";

import Image from "next/image";

import {
    Camera,
    ImageIcon,
} from "lucide-react";

import {
    ChangeEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { toast } from "sonner";

import { profileStore } from "@/stores/profile.store";

interface CoverUploaderProps {

    coverUrl?: string | null;

}

export function CoverUploader({

    coverUrl,

}: CoverUploaderProps) {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [preview, setPreview] =
        useState<string | null>(
            coverUrl ?? null
        );

    useEffect(() => {

        setPreview(
            coverUrl ?? null
        );

    }, [coverUrl]);

    const uploadCover =
        profileStore(
            (state) =>
                state.uploadCover
        );

    const loading =
        profileStore(
            (state) =>
                state.loading
        );

    async function handleUpload(

        event:
            ChangeEvent<HTMLInputElement>

    ) {

        const file =
            event.target.files?.[0];

        if (!file) return;

        if (
            !file.type.startsWith("image/")
        ) {

            toast.error(
                "Please choose an image."
            );

            return;

        }

        if (
            file.size >
            5 * 1024 * 1024
        ) {

            toast.error(
                "Maximum size is 5 MB."
            );

            return;

        }

        setPreview(
            URL.createObjectURL(file)
        );

        const success =
            await uploadCover(file);

        if (success) {

            toast.success(
                "Cover updated."
            );

        }

    }

    return (

        <div className="space-y-4">

            <label
                className="
                    text-sm
                    font-medium
                    text-white
                "
            >

                Cover Image

            </label>

            <div

                onClick={() =>
                    inputRef.current?.click()
                }

                className="
                    group
                    relative
                    flex
                    h-56
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-zinc-900
                    transition

                    hover:border-violet-500
                "
            >

                {

                    preview ? (

                          <img
    src={preview!}
    alt="Avatar"
    className="absolute inset-0 h-full w-full object-cover"
/>
                    ) : (

                        <ImageIcon

                            size={70}

                            className="
                                text-zinc-500
                            "

                        />

                    )

                }

                <div
                    className="
                        absolute
                        inset-0

                        flex
                        items-center
                        justify-center

                        bg-black/60

                        opacity-0

                        transition

                        group-hover:opacity-100
                    "
                >

                    <Camera
                        size={40}
                        className="
                            text-white
                        "
                    />

                </div>

            </div>

            <input

                hidden

                ref={inputRef}

                type="file"

                accept="image/*"

                onChange={handleUpload}

            />

            <p
                className="
                    text-sm
                    text-zinc-400
                "
            >

                {

                    loading

                        ? "Uploading..."

                        : "Click cover to change"

                }

            </p>

        </div>

    );

}