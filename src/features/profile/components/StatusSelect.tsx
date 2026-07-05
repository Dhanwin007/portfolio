"use client";

import { forwardRef } from "react";

import type { PortfolioStatus } from "../types";

interface StatusSelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {

    error?: string;

}

const options: {
    label: string;
    value: PortfolioStatus;
}[] = [

    {
        label: "Available",
        value: "available",
    },

    {
        label: "Open To Work",
        value: "open_to_work",
    },

    {
        label: "Open To Internship",
        value: "open_to_internship",
    },

    {
        label: "Freelancing",
        value: "freelancing",
    },

    {
        label: "Busy",
        value: "busy",
    },

];

export const StatusSelect =
    forwardRef<
        HTMLSelectElement,
        StatusSelectProps
    >(
        (
            {
                error,
                className,
                ...props
            },
            ref
        ) => {

            return (

                <div className="space-y-2">

                    <select

                        ref={ref}

                        {...props}

                        className={`
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-zinc-900
                            px-4
                            text-white
                            outline-none
                            transition

                            focus:border-violet-500

                            ${className ?? ""}
                        `}
                    >

                        {options.map((option) => (

                            <option
                                key={option.value}
                                value={option.value}
                            >

                                {option.label}

                            </option>

                        ))}

                    </select>

                    {error && (

                        <p className="text-sm text-red-400">

                            {error}

                        </p>

                    )}

                </div>

            );

        }
    );

StatusSelect.displayName =
    "StatusSelect";