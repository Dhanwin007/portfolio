"use client";

import Link from "next/link";

import { Mail } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthCard } from "./AuthCard";
import { OAuthButtons } from "./OAuthButtons";
import { PasswordInput } from "./PasswordInput";

import {
    loginSchema,
    type LoginFormValues,
} from "../validations/login.schema";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";


export function LoginForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });
    const router = useRouter();
    const login = authStore((state) => state.login);

const loading = authStore((state) => state.loading);

const error = authStore((state) => state.error);

const clearError = authStore((state) => state.clearError);
  
    const onSubmit: SubmitHandler<LoginFormValues> =
        async (data) => {
            clearError();
             const success = await login(data);
             

           
    if (success) {
        router.push("/dashboard");
    }
    
        };

    return (
        <AuthCard
            title="Welcome Back"
            description="Sign in to continue building your professional portfolio."
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Email */}

                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="text-zinc-200"
                    >
                        Email
                    </Label>

                    <div className="group relative">

                        <Mail
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
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            autoComplete="email"
                            {...register("email")}
                            className="
                                h-12
                                rounded-xl
                                border-white/10
                                bg-white/5
                                pl-12
                                text-white
                                placeholder:text-zinc-500
                                transition-all

                                hover:border-white/20

                                focus-visible:border-violet-500
                                focus-visible:ring-2
                                focus-visible:ring-violet-500/20
                            "
                        />

                    </div>

                    {errors.email && (
                        <p className="text-sm text-red-400">
                            {errors.email.message}
                        </p>
                    )}

                </div>

                {/* Password */}

                <div className="space-y-2">

                    <div className="flex items-center justify-between">

                        <Label
                            htmlFor="password"
                            className="text-zinc-200"
                        >
                            Password
                        </Label>

                        <Link
                            href="/forgot-password"
                            className="
                                text-xs
                                text-zinc-400
                                transition-colors
                                hover:text-violet-400
                            "
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <PasswordInput
                        id="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        {...register("password")}
                    />

                    {errors.password && (
                        <p className="text-sm text-red-400">
                            {errors.password.message}
                        </p>
                    )}
                                    </div>

                {/* Remember Me */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Checkbox
                            id="rememberMe"
                            checked={watch("rememberMe")}
                            onCheckedChange={(checked) =>
                                setValue(
                                    "rememberMe",
                                    Boolean(checked),
                                    {
                                        shouldValidate: true,
                                    }
                                )
                            }
                        />

                        <Label
                            htmlFor="rememberMe"
                            className="cursor-pointer text-sm font-normal text-zinc-300"
                        >
                            Remember me
                        </Label>

                    </div>

                </div>
                {/* Store Error */}

{error && (

    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

        <p className="text-sm text-red-300">
            {error}
        </p>

    </div>

)}

                {/* Login Button */}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        h-12
                        w-full
                        rounded-xl
                        bg-gradient-to-r
                        from-violet-600
                        to-fuchsia-600
                        text-base
                        font-semibold
                        text-white
                        shadow-lg
                        shadow-violet-500/20
                        transition-all
                        duration-300

                        hover:scale-[1.02]
                        hover:shadow-violet-500/40

                        active:scale-[0.98]
                    "
                >
                    {isSubmitting
                        ? "Signing In..."
                        : "Sign In"}
                </Button>

                {/* Divider */}

                <div className="flex items-center gap-4">

                    <Separator className="flex-1 bg-white/10" />

                    <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                        Continue with
                    </span>

                    <Separator className="flex-1 bg-white/10" />

                </div>

                {/* OAuth */}

                <OAuthButtons />

                {/* Footer */}

                <p className="text-center text-sm text-zinc-400">

                    Don't have an account?{" "}

                    <Link
                        href="/register"
                        className="
                            font-semibold
                            text-violet-400
                            transition-colors

                            hover:text-violet-300
                        "
                    >
                        Create one
                    </Link>

                </p>

            </form>

        </AuthCard>
    );
}