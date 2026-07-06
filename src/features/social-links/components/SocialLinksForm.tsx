"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    socialLinksSchema,
    type SocialLinksFormValues,
} from "../validations/social-links.schema";

import { socialLinksStore } from "@/stores/social-links.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SocialLinksForm() {

    const socialLinks =
        socialLinksStore(
            state => state.socialLinks
        );

    const loading =
        socialLinksStore(
            state => state.loading
        );

    const error =
        socialLinksStore(
            state => state.error
        );

    const fetchSocialLinks =
        socialLinksStore(
            state => state.fetchSocialLinks
        );

    const updateSocialLinks =
        socialLinksStore(
            state => state.updateSocialLinks
        );

    const clearError =
        socialLinksStore(
            state => state.clearError
        );

    const {

        register,

        handleSubmit,

        reset,

    } = useForm<SocialLinksFormValues>({

        resolver:
            zodResolver(
                socialLinksSchema
            ),

        defaultValues: {

            github: "",

            linkedin: "",

            portfolio: "",

            leetcode: "",

            codeforces: "",

            hackerrank: "",

            youtube: "",

            twitter: "",

        },

    });

    useEffect(() => {

        fetchSocialLinks();

    }, [fetchSocialLinks]);

    useEffect(() => {

        if (!socialLinks) return;

        reset({

            github:
                socialLinks.github ?? "",

            linkedin:
                socialLinks.linkedin ?? "",

            portfolio:
                socialLinks.portfolio ?? "",

            leetcode:
                socialLinks.leetcode ?? "",

            codeforces:
                socialLinks.codeforces ?? "",

            hackerrank:
                socialLinks.hackerrank ?? "",

            youtube:
                socialLinks.youtube ?? "",

            twitter:
                socialLinks.twitter ?? "",

        });

    }, [socialLinks, reset]);

    const onSubmit:
        SubmitHandler<
            SocialLinksFormValues
        > = async (data) => {

        clearError();

        const success =
            await updateSocialLinks(
                data
            );

        if (success) {

            toast.success(
                "Social links updated."
            );

        }

    };

    const fields = [

        {
            label: "GitHub",
            name: "github",
        },

        {
            label: "LinkedIn",
            name: "linkedin",
        },

        {
            label: "Portfolio",
            name: "portfolio",
        },

        {
            label: "LeetCode",
            name: "leetcode",
        },

        {
            label: "Codeforces",
            name: "codeforces",
        },

        {
            label: "HackerRank",
            name: "hackerrank",
        },

        {
            label: "YouTube",
            name: "youtube",
        },

        {
            label: "Twitter",
            name: "twitter",
        },

    ] as const;

    return (

        <form

            onSubmit={
                handleSubmit(
                    onSubmit
                )
            }

            className="
                space-y-6

                rounded-3xl

                border

                border-white/10

                bg-white/5

                p-8
            "

        >

            {

                fields.map(field => (

                    <div

                        key={field.name}

                        className="space-y-2 text-white"

                    >

                        <Label>

                            {field.label}

                        </Label>

                        <Input

                            placeholder={`${field.label} URL`}

                            {

                                ...register(
                                    field.name
                                )

                            }

                        />

                    </div>

                ))

            }

            {

                error && (

                    <p className="text-red-400">

                        {error}

                    </p>

                )

            }

            <Button

                type="submit"

                disabled={loading}

                className="w-full"

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