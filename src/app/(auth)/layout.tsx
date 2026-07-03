// src/app/(auth)/layout.tsx

import type { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-4 py-10">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Purple Glow */}
            <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-violet-600/30 blur-[140px]" />

            {/* Blue Glow */}
            <div className="absolute bottom-[-180px] right-[-180px] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[150px]" />

            {/* Small Glow */}
            <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#fff_0.5px,transparent_0.5px)] [background-size:18px_18px]" />

            <div className="relative z-10 w-full flex justify-center">
                {children}
            </div>

        </main>
    );
}