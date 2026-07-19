import { useRef, useState } from "react";
import { Upload, FileText, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePortfolioSettingsStore } from "@/stores/portfolio-settings.store";

interface ResumeUploaderProps {
    value: string;
    onChange: (url: string) => void;
}

export default function ResumeUploader({
    value,
    onChange,
}: ResumeUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { uploadResume, deleteResume } = usePortfolioSettingsStore();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file: File) => {
        if (file.type !== "application/pdf") {
            toast.error("Only PDF resumes are allowed.");
            return;
        }

        try {
            setUploading(true);

            if (value) {
                await deleteResume(value);
            }

            const url = await uploadResume(file);

            onChange(url);

            toast.success("Resume uploaded successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload resume.");
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
            await deleteResume(value);

            onChange("");

            toast.success("Resume deleted.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete resume.");
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
                    accept=".pdf"
                    hidden
                    onChange={handleFileChange}
                />

                <FileText className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

                <p className="mb-4 text-sm text-muted-foreground">
                    Drag & drop your resume here
                </p>

                <Button
                    type="button"
                    disabled={uploading}
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading
                        ? "Uploading..."
                        : value
                        ? "Replace Resume"
                        : "Upload Resume"}
                </Button>
            </div>

            {value && (
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        <span className="text-sm font-medium">
                            Resume Uploaded
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            asChild
                        >
                            <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download className="h-4 w-4" />
                            </a>
                        </Button>

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