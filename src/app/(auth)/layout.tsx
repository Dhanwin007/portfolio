// src/app/(auth)/layout.tsx

import type { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            {children}
        </main>
    );
}