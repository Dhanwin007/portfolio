import { useRef, useState } from "react";
import { Upload, Video, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePortfolioSettingsStore } from "@/stores/portfolio-settings.store";

interface IntroVideoUploaderProps {
    value: string;
    onChange: (url: string) => void;
}

export default function IntroVideoUploader({
    value,
    onChange,
}: IntroVideoUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { uploadIntroVideo, deleteIntroVideo } = usePortfolioSettingsStore();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith("video/")) {
            toast.error("Please upload a valid video.");
            return;
        }

        try {
            setUploading(true);

            if (value) {
                await deleteIntroVideo(value);
            }

            const url = await uploadIntroVideo(file);

            onChange(url);

            toast.success("Intro video uploaded successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload intro video.");
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        await handleUpload(file);

        event.target.value = "";
    };

    const handleDrop = async (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();

        const file = event.dataTransfer.files?.[0];

        if (!file) {
            return;
        }

        await handleUpload(file);
    };

    const handleDelete = async () => {
        if (!value) {
            return;
        }

        try {
            await deleteIntroVideo(value);
            onChange("");
            toast.success("Intro video deleted.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete intro video.");
        }
    };

    return (
        <div className="space-y-4">
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="rounded-lg border-2 border-dashed p-6 text-center"
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleFileChange}
                />

                <Video className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

                <p className="mb-4 text-sm text-muted-foreground">
                    Drag & drop your intro video here
                </p>

                <Button
                    type="button"
                    disabled={uploading}
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? "Uploading..." : value ? "Replace Video" : "Upload Video"}
                </Button>
            </div>

            {value && (
                <div className="space-y-3">
                    <video
                        src={value}
                        controls
                        className="w-full rounded-lg border"
                    />

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}