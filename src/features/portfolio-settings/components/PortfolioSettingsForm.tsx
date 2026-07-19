"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ResumeUploader from "./ResumeUploader";
import IntroVideoUploader from "./IntroVideoUploader";
import {
    portfolioSettingsSchema,
    PortfolioSettingsFormValues,
} from "../validations/portfolio-settings.schema";
import type { PortfolioSettings } from "../types";

interface PortfolioSettingsFormProps {
    initialData: PortfolioSettings | null;
    onSubmit: (values: PortfolioSettingsFormValues) => Promise<boolean>;
}

export default function PortfolioSettingsForm({
    initialData,
    onSubmit,
}: PortfolioSettingsFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm<PortfolioSettingsFormValues>({
        resolver: zodResolver(portfolioSettingsSchema),
        defaultValues: {
            theme: "system",
            resume_url: "",
            intro_video_url: "",
            allow_resume_download: true,
            allow_messages: true,
            show_location: true,
        },
    });

    useEffect(() => {
        if (!initialData) {
            return;
        }

        reset({
            theme: initialData.theme,
            resume_url: initialData.resume_url ?? "",
            intro_video_url: initialData.intro_video_url ?? "",
            allow_resume_download: initialData.allow_resume_download,
            allow_messages: initialData.allow_messages,
            show_location: initialData.show_location,
        });
    }, [initialData, reset]);

    const submit = async (values: PortfolioSettingsFormValues) => {
        const success = await onSubmit(values);

        if (success) {
            toast.success("Portfolio settings updated.");
        } else {
            toast.error("Failed to update portfolio settings.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-8 bg-card rounded-lg p-6 shadow-md "
        >
            <div className="space-y-3">
                <Label>Theme</Label>

                <select
                    {...register("theme")}
                    className="w-full rounded-md border px-3 py-2"
                >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div className="space-y-3">
                <Label>Resume</Label>

                <ResumeUploader
                    value={watch("resume_url")}
                    onChange={(url) =>
                        setValue("resume_url", url, {
                        shouldDirty: true,
                        shouldValidate: true,
                        })                
                    }
                />
            </div>

            <div className="space-y-3">
                <Label>Intro Video</Label>

                <IntroVideoUploader
                    value={watch("intro_video_url")}
                    onChange={(url) =>
                        setValue("intro_video_url", url, {
    shouldDirty: true,
    shouldValidate: true,
})
                    }
                />
            </div>

            <div className="flex items-center justify-between">
                <Label htmlFor="resume-download">
                    Allow Resume Download
                </Label>

                <Switch
                    id="resume-download"
                    checked={watch("allow_resume_download")}
                    onCheckedChange={(checked) =>
                        setValue(
                            "allow_resume_download",
                            checked
                        )
                    }
                />
            </div>

            <div className="flex items-center justify-between">
                <Label htmlFor="allow-messages">
                    Allow Messages
                </Label>

                <Switch
                    id="allow-messages"
                    checked={watch("allow_messages")}
                    onCheckedChange={(checked) =>
                        setValue(
                            "allow_messages",
                            checked
                        )
                    }
                />
            </div>

            <div className="flex items-center justify-between">
                <Label htmlFor="show-location">
                    Show Location
                </Label>

                <Switch
                    id="show-location"
                    checked={watch("show_location")}
                    onCheckedChange={(checked) =>
                        setValue(
                            "show_location",
                            checked
                        )
                    }
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting
                    ? "Saving..."
                    : "Save Settings"}
            </Button>
        </form>
    );
}