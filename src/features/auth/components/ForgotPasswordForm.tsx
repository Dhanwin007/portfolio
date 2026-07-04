"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { AuthCard } from "./AuthCard";

import {
    forgotPasswordSchema,
    type ForgotPasswordFormValues,
} from "../validations/forgot-password.schema";

import { authStore } from "@/stores/auth.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
     const clearError = authStore(
        (state) => state.clearError
    );

    useEffect(() => {
        clearError();
    }, [clearError]);


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(
            forgotPasswordSchema
        ),

        defaultValues: {
            email: "",
        },
    });

    const forgotPassword =
        authStore(
            (state) => state.forgotPassword
        );

    const loading =
        authStore(
            (state) => state.loading
        );

    const error =
        authStore(
            (state) => state.error
        );

   

    const onSubmit:
        SubmitHandler<ForgotPasswordFormValues> =
        async (data) => {

            clearError();

            const success =
                await forgotPassword(
                    data.email
                );

            if (success) {

                toast.success(
                    "Password reset link sent successfully."
                );

            }

        };

    return (

        <AuthCard
            title="Forgot Password"
            description="Enter your email address and we'll send you a password reset link."
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
                            autoComplete="email"
                            placeholder="john@example.com"
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

                {/* Store Error */}

                {error && (

                    <div
                        className="
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            px-4
                            py-3
                        "
                    >

                        <p className="text-sm text-red-300">
                            {error}
                        </p>

                    </div>

                )}

                {/* Submit */}

                <Button
                    type="submit"
                    disabled={loading}
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

                    {loading
                        ? "Sending..."
                        : "Send Reset Link"}

                </Button>

                {/* Footer */}

                <p className="text-center text-sm text-zinc-400">

                    Remember your password?{" "}

                    <Link
                        href="/login"
                        className="
                            font-semibold
                            text-violet-400
                            transition-colors

                            hover:text-violet-300
                        "
                    >
                        Back to Login
                    </Link>

                </p>

            </form>

        </AuthCard>

    );

}