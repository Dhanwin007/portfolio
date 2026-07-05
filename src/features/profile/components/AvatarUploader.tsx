"use client";

import Image from "next/image";

import {
    Camera,
    User,
} from "lucide-react";

import {
    ChangeEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { toast } from "sonner";

import { profileStore } from "@/stores/profile.store";

interface AvatarUploaderProps {

    avatarUrl?: string | null;

}

export function AvatarUploader({

    avatarUrl,

}: AvatarUploaderProps) {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [preview, setPreview] =
        useState<string | null>(
            avatarUrl ?? null
        );

    const uploadAvatar =
        profileStore(
            (state) =>
                state.uploadAvatar
        );

    const loading =
        profileStore(
            (state) =>
                state.loading
        );
useEffect(() => {

    setPreview(avatarUrl ?? null);

}, [avatarUrl]);
    async function handleUpload(

        event:
            ChangeEvent<HTMLInputElement>

    ) {

        const file =
            event.target.files?.[0];

        if (!file) return;

        const imageUrl =
            URL.createObjectURL(file);

        setPreview(imageUrl);

        const success =
            await uploadAvatar(file);

        if (success) {

            toast.success(
                "Avatar updated."
            );

        } else {

            toast.error(
                "Failed to upload avatar."
            );

        }

    }
    console.log("Preview:", preview);

    return (

        <div
            className="
                flex
                flex-col
                items-center
                gap-4
            "
        >

            <div

                onClick={() =>
                    inputRef.current?.click()
                }

                className="
                    group
                    relative
                    flex
                    h-36
                    w-36
                    cursor-pointer
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-2
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

                        <User
                            size={70}
                            className="text-zinc-500"
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
                        size={34}
                        className="text-white"
                    />

                </div>

            </div>

            <input

                ref={inputRef}

                type="file"

                accept="image/*"

                hidden

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

                        : "Click avatar to change"

                }

            </p>

        </div>

    );

}