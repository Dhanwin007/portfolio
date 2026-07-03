"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface PasswordInputProps
    extends React.ComponentProps<typeof Input> {}

export function PasswordInput({
    className,
    ...props
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="group relative">
            {/* Left Icon */}
            <Lock
                size={18}
                className="
                    absolute
                    left-4
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-zinc-500
                    transition-colors
                    group-focus-within:text-violet-400
                "
            />

            <Input
                {...props}
                type={showPassword ? "text" : "password"}
                className={cn(
                    `
                    h-12
                    rounded-xl
                    border-white/10
                    bg-white/5
                    pl-12
                    pr-12
                    text-white
                    placeholder:text-zinc-500
                    transition-all
                    duration-300

                    focus-visible:border-violet-500
                    focus-visible:bg-white/10
                    focus-visible:ring-2
                    focus-visible:ring-violet-500/20

                    hover:border-white/20
                    `,
                    className
                )}
            />

            <button
                type="button"
                onClick={() =>
                    setShowPassword((prev) => !prev)
                }
           className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-zinc-500 transition-colors hover:text-white"
            >
                {showPassword ? (
                    <EyeOff size={18} />
                ) : (
                    <Eye size={18} />
                )}
            </button>
        </div>
    );
}