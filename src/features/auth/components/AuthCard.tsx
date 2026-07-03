"use client";

import type { ReactNode } from "react";

interface AuthCardProps {
    title: string;
    description: string;
    children: ReactNode;
}

export function AuthCard({
    title,
    description,
    children,
}: AuthCardProps) {
    return (
        <div
           className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:p-10"
        >
            {/* Glow */}
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-violet-500/20 blur-[90px]" />
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-[110px]" />

            {/* Border highlight */}
            <div className="absolute inset-0 rounded-[32px] border border-white/5" />

            <div className="relative z-10">

                <div className="mb-10 flex flex-col items-center">

                    <div
                       className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-2xl font-bold text-white shadow-lg shadow-violet-500/30"
                    >
                        P
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        {title}
                    </h1>

                    <p className="mt-3 max-w-xs text-center text-sm leading-6 text-zinc-400">
                        {description}
                    </p>

                </div>

                {children}

            </div>
        </div>
    );
}