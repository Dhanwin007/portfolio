"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";


import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";


import {
    resetPasswordSchema,
    type ResetPasswordFormValues,
} from "../validations/reset-password.schema";

import { AuthCard } from "./AuthCard";
import { PasswordInput } from "./PasswordInput";

import { authStore } from "@/stores/auth.store";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {

    const router = useRouter();
   
   
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(
            resetPasswordSchema
        ),

        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const resetPassword =
        authStore(
            (state) => state.resetPassword
        );

    const loading =
        authStore(
            (state) => state.loading
        );

    const error =
        authStore(
            (state) => state.error
        );

    const clearError =
        authStore(
            (state) => state.clearError
        );
      

   

    const onSubmit:
        SubmitHandler<ResetPasswordFormValues> =
        async (data) => {

            clearError();

            const success =
                await resetPassword(
                    data.password
                );

            if (success) {

                toast.success(
                    "Password updated successfully."
                );

                router.replace("/login");

            }

        };

    return (

        <AuthCard
            title="Reset Password"
            description="Choose a new secure password for your account."
        >

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >                {/* New Password */}

                <div className="space-y-2">

                    <Label
                        htmlFor="password"
                        className="text-zinc-200"
                    >
                        New Password
                    </Label>

                    <PasswordInput
                        id="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        {...register("password")}
                    />

                    {errors.password && (

                        <p className="text-sm text-red-400">
                            {errors.password.message}
                        </p>

                    )}

                </div>

                {/* Confirm Password */}

                <div className="space-y-2">

                    <Label
                        htmlFor="confirmPassword"
                        className="text-zinc-200"
                    >
                        Confirm Password
                    </Label>

                    <PasswordInput
                        id="confirmPassword"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                    />

                    {errors.confirmPassword && (

                        <p className="text-sm text-red-400">
                            {errors.confirmPassword.message}
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

                {/* Submit Button */}

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
                        ? "Updating Password..."
                        : "Update Password"}

                </Button>

                {/* Footer */}

                <p className="text-center text-sm text-zinc-400">

                    Remembered your password?{" "}

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