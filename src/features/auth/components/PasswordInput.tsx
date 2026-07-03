"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput(props: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                type={showPassword ? "text" : "password"}
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
}