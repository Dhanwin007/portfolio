"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    registerSchema,
    type RegisterFormValues,
} from "../validations/register.schema";

import { authStore } from "@/stores/auth.store";

import { AuthCard } from "./AuthCard";
import { PasswordInput } from "./PasswordInput";
import { OAuthButtons } from "./OAuthButtons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export function RegisterForm() {

    const router = useRouter();

    const registerUser = authStore(
        (state) => state.register
    );

    const loading = authStore(
        (state) => state.loading
    );

    const error = authStore(
        (state) => state.error
    );

    const clearError = authStore(
        (state) => state.clearError
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            displayName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    });

    const acceptTerms = watch("acceptTerms");

    const onSubmit: SubmitHandler<RegisterFormValues> =
        async (data) => {

            clearError();

            const success = await registerUser({
                displayName: data.displayName,
                username: data.username,
                email: data.email,
                password: data.password,
            });

            if (success) {
                router.push("/login");
            }
        };

    return (

        <AuthCard
            title="Create Account"
            description="Join and start building your premium portfolio."
        >

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >

                {/* Display Name */}

                <div className="space-y-2 text-violet-400/80 hover:text-violet-400">

                    <Label htmlFor="displayName">
                        Full Name
                    </Label>

                    <Input
                        id="displayName"
                        placeholder="John Doe"
                        autoComplete="name"
                        {...register("displayName")}
                    />

                    {errors.displayName && (

                        <p className="text-sm text-red-400">
                            {errors.displayName.message}
                        </p>

                    )}

                </div>

                {/* Username */}

                <div className="space-y-2 text-violet-400/80 hover:text-violet-400">

                    <Label htmlFor="username">
                        Username
                    </Label>

                    <Input
                        id="username"
                        placeholder="john_doe"
                        autoComplete="username"
                        {...register("username")}
                    />

                    {errors.username && (

                        <p className="text-sm text-red-400">
                            {errors.username.message}
                        </p>

                    )}

                </div>

                {/* Email */}

                <div className="space-y-2 text-violet-400/80 hover:text-violet-400">

                    <Label htmlFor="email">
                        Email
                    </Label>

                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        {...register("email")}
                    />

                    {errors.email && (

                        <p className="text-sm text-red-400">
                            {errors.email.message}
                        </p>

                    )}

                </div>

                {/* Password */}

                <div className="space-y-2 text-violet-400/80 hover:text-violet-400">

                    <Label htmlFor="password">
                        Password
                    </Label>

                    <PasswordInput
                        id="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        {...register("password")}
                    />

                    {errors.password && (

                        <p className="text-sm text-red-400">
                            {errors.password.message}
                        </p>

                    )}

                </div>

                {/* Confirm Password */}

                <div className="space-y-2 text-violet-400/80 hover:text-violet-400">

                    <Label htmlFor="confirmPassword">
                        Confirm Password
                    </Label>

                    <PasswordInput
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        {...register("confirmPassword")}
                    />

                    {errors.confirmPassword && (

                        <p className="text-sm text-red-400">
                            {errors.confirmPassword.message}
                        </p>

                    )}

                </div>
                                {/* Terms & Conditions */}

                <div className="space-y-2">

                    <div className="flex items-start gap-3 ">

                        <Checkbox
                            id="acceptTerms"
                            checked={acceptTerms}
                            onCheckedChange={(checked) =>
                                setValue(
                                    "acceptTerms",
                                    checked === true,
                                    {
                                        shouldValidate: true,
                                    }
                                )
                            }
                        />

                        <Label
                            htmlFor="acceptTerms"
                            className="cursor-pointer text-sm font-normal leading-6 text-muted-foreground "
                        >
                            I agree to the{" "}

                            <Link
                                href="/terms"
                                className="font-medium text-foreground hover:underline text-violet-400/80 hover:text-violet-400"
                            >
                                Terms & Conditions
                            </Link>

                            {" "}and{" "}

                            <Link
                                href="/privacy"
                                className="font-medium text-foreground hover:underline text-violet-400/80 hover:text-violet-400"
                            >
                                Privacy Policy
                            </Link>

                        </Label>

                    </div>

                    {errors.acceptTerms && (

                        <p className="text-sm text-red-400">
                            {errors.acceptTerms.message}
                        </p>

                    )}

                </div>
                                {/* Store Error */}

                {error && (

                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                        <p className="text-sm text-red-300">
                            {error}
                        </p>

                    </div>

                )}

                {/* Submit */}

                <Button
                    type="submit"
                    disabled={loading}
                    className="h-11 w-full rounded-xl text-violet-400/80 hover:text-violet-400 color-white/10 hover:bg-white/5 hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.98] transition-all duration-300"
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account"}
                </Button>

                {/* Divider */}

                <div className="flex items-center gap-4">

                    <Separator className="flex-1" />

                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        OR
                    </span>

                    <Separator className="flex-1" />

                </div>

                {/* OAuth */}

                <OAuthButtons />

                {/* Footer */}

                <p className="text-center text-sm text-muted-foreground">

                    Already have an account?{" "}

                    <Link
                        href="/login"
                        className="font-medium text-foreground transition-colors hover:underline text-violet-400/80 hover:text-violet-400"
                    >
                        Sign In
                    </Link>

                </p>

            </form>

        </AuthCard>

    );

}