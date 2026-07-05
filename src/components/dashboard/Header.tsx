"use client";

import { usePathname } from "next/navigation";

export function Header() {

    const pathname = usePathname();

    const title =
        pathname.split("/").pop()?.replace("-", " ") ??
        "Dashboard";

    return (

        <header
            className="
                flex
                h-20
                items-center
                justify-between
                border-b
                border-white/10
                px-8
            "
        >

            <div>

                <h2
                    className="
                        text-2xl
                        font-bold
                        capitalize
                        text-white
                    "
                >
                    {title}
                </h2>

            </div>

            <div
                className="
                    h-10
                    w-10
                    rounded-full
                    bg-violet-600
                "
            />

        </header>

    );

}