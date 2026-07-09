"use client";

import { useRef, useState } from "react";

import { Upload, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FileUploaderProps {

    label: string;

    accept: string;

    currentUrl?: string;

    onUpload: (
        file: File
    ) => Promise<string | null>;

    onUploaded: (
        url: string
    ) => void;

}

export function FileUploader({

    label,

    accept,

    currentUrl,

    onUpload,

    onUploaded,

}: FileUploaderProps) {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [

        uploading,

        setUploading,

    ] = useState(false);

    async function handleChange(

        e: React.ChangeEvent<HTMLInputElement>

    ) {

        const file =
            e.target.files?.[0];

        if (!file) {

            return;

        }

        setUploading(true);

        const url =
            await onUpload(file);

        setUploading(false);

        if (!url) {

            return;

        }

        onUploaded(url);

    }

    return (

        <div className="space-y-3">

            <label

                className="
                    text-sm
                    font-medium
                    text-white
                "

            >

                {label}

            </label>

            <input

                ref={inputRef}

                type="file"

                accept={accept}

                className="hidden"

                onChange={handleChange}

            />

            <div

                className="
                    rounded-2xl
                    border
                    border-dashed
                    border-white/15
                    bg-white/5
                    p-6
                "

            >

                <div

                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-4
                    "

                >

                    {

                        uploading ? (

                            <Loader2

                                className="
                                    h-8
                                    w-8
                                    animate-spin
                                "

                            />

                        ) : (

                            <Upload

                                className="
                                    h-8
                                    w-8
                                    text-violet-400
                                "

                            />

                        )

                    }

                    <Button

                        type="button"

                        variant="outline"

                        className="text-black"

                        disabled={uploading}

                        onClick={() =>
                            inputRef.current?.click()
                        }

                    >

                        {

                            uploading

                                ? "Uploading..."

                                : "Choose File"

                        }

                    </Button>

                    {

                        currentUrl && (

                            <a

                                href={currentUrl}

                                target="_blank"

                                rel="noopener noreferrer"

                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-violet-400

                                    hover:text-violet-300
                                "

                            >

                                <FileText

                                    className="
                                        h-4
                                        w-4
                                    "

                                />

                                View Uploaded File

                            </a>

                        )

                    }

                </div>

            </div>

        </div>

    );

}