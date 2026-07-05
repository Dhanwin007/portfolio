"use client";

import { forwardRef } from "react";

interface PublishToggleProps
    extends React.InputHTMLAttributes<HTMLInputElement> {

    label?: string;

}

export const PublishToggle =
    forwardRef<
        HTMLInputElement,
        PublishToggleProps
    >(

        (
            {
                label =
                    "Publish Portfolio",
                ...props
            },
            ref
        ) => {

            return (

                <label
                    className="
                        flex
                        cursor-pointer
                        items-center
                        gap-4
                    "
                >

                    <input

                        ref={ref}

                        type="checkbox"

                        className="
                            h-5
                            w-5
                            accent-violet-600
                        "

                        {...props}

                    />

                    <span
                        className="
                            text-white
                        "
                    >

                        {label}

                    </span>

                </label>

            );

        }

    );

PublishToggle.displayName =
    "PublishToggle";