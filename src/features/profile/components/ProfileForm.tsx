"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    profileSchema,
    type ProfileFormValues,
} from "../validations/profile.schema";

import { AvatarUploader } from "./AvatarUploader";
import { CoverUploader } from "./CoverUploader";
import { PublishToggle } from "./PublishToggle";
import { StatusSelect } from "./StatusSelect";

import { profileStore } from "@/stores/profile.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProfileForm() {

    const {

        profile,

        loading,

        error,

        fetchProfile,

        updateProfile,

        clearError,

    } = profileStore();

    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors,

        },

    } = useForm<ProfileFormValues>({

        resolver:
            zodResolver(profileSchema),

        defaultValues: {

            display_name: "",

            headline: "",

            bio: "",

            current_status: "available",

            is_published: false,

        },

    });

    // useEffect(() => {

    //     fetchProfile();

    // }, [fetchProfile]);

    useEffect(() => {

        if (!profile) return;

        reset({

            display_name:
                profile.display_name,

            headline:
                profile.headline ?? "",

            bio:
                profile.bio ?? "",

            current_status:
                profile.current_status,

            is_published:
                profile.is_published,

        });

    }, [profile, reset]);

    const onSubmit:
        SubmitHandler<
            ProfileFormValues
        > = async (data) => {

        clearError();

        const success =
            await updateProfile(data);

        if (success) {

            toast.success(
                "Profile updated successfully."
            );

        }

    };

    return (

        <form
            onSubmit={
                handleSubmit(onSubmit)
            }
            className="
                space-y-8
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
            "
        >

            <CoverUploader
                coverUrl={
                    profile?.cover_url
                }
            />

            <AvatarUploader
                avatarUrl={
                    profile?.avatar_url
                }
            />

            <div className="space-y-2 text-white">

                <Label>

                    Display Name

                </Label>

                <Input
                    {...register(
                        "display_name"
                    )}
                />

                {errors.display_name && (

                    <p className="text-sm text-red-400">

                        {
                            errors
                                .display_name
                                .message
                        }

                    </p>

                )}

            </div>

            <div className="space-y-2 text-white">

                <Label>

                    Headline

                </Label>

                <Input
                    {...register(
                        "headline"
                    )}
                />

            </div>

            <div className="space-y-2 text-white">

                <Label>

                    Bio

                </Label>

                <Textarea
                    rows={6}
                    {...register("bio")}
                />

            </div>

            <div className="space-y-2 text-white">

                <Label>

                    Current Status

                </Label>

                <StatusSelect

                    {...register(
                        "current_status"
                    )}

                    error={
                        errors
                            .current_status
                            ?.message
                    }

                />

            </div>

            <PublishToggle

                {...register(
                    "is_published"
                )}

            />

            {error && (

                <div
                    className="
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        p-4
                    "
                >

                    <p className="text-red-300">

                        {error}

                    </p>

                </div>

            )}

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
                "

            >

                {

                    loading

                        ? "Saving..."

                        : "Save Changes"

                }

            </Button>

        </form>

    );

}