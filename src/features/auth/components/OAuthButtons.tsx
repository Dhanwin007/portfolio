"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OAuthButtonsProps {
    isLoading?: boolean;
    onGoogle?: () => void;
    onGithub?: () => void;
}

export function OAuthButtons({
    isLoading = false,
    onGoogle,
    onGithub,
}: OAuthButtonsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Google */}

            <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={onGoogle}
                className={cn("h-12 rounded-xl border-white/10 bg-white/5 text-white shadow-none transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.98]")}
            >
                <FaGoogle
                    className="mr-2 shrink-0"
                    size={18}
                />

                <span className="font-medium">
                    Google
                </span>
            </Button>

            {/* GitHub */}

            <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={onGithub}
               className={cn("h-12 rounded-xl border-white/10 bg-white/5 text-white shadow-none transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.98]")}
            >
                <FaGithub
                    className="mr-2 shrink-0"
                    size={18}
                />

                <span className="font-medium">
                    GitHub
                </span>
            </Button>
        </div>
    );
}