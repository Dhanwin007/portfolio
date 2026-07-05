"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { authStore } from "@/stores/auth.store";

import { Button } from "@/components/ui/button";

export function Header() {

    const pathname = usePathname();

    const router = useRouter();

    const logout =
        authStore(
            (state) => state.logout
        );

    const title =
        pathname
            .split("/")
            .pop()
            ?.replace("-", " ") ??
        "Dashboard";

    const [loading, setLoading] =
        useState(false);

    async function handleLogout() {

        setLoading(true);

        await logout();

        router.replace("/login");

    }

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

            <div className="flex items-center gap-4">

                {/* <div
                    className="
                        h-10
                        w-10
                        rounded-full
                        bg-violet-600
                    "
                /> */}

                <Button
                    onClick={handleLogout}
                    disabled={loading}
                    variant="destructive"
                    className="gap-2"
                >

                    <LogOut size={18} />

                    {loading
                        ? "Logging out..."
                        : "Logout"}

                </Button>

            </div>

        </header>

    );

}