import Link from "next/link";
import { Button } from "@/components/ui/button";

import type { PortfolioSettings } from "@/features/portfolio-settings/types";

interface HeroActionsProps {
    portfolioSettings: PortfolioSettings | null;
}

export default function HeroActions({
    portfolioSettings,
}: HeroActionsProps) {
    if (!portfolioSettings) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-6">
            {portfolioSettings.allow_resume_download &&
                portfolioSettings.resume_url && (
                    <Button asChild>
                        <Link
                            href={portfolioSettings.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download Resume
                        </Link>
                    </Button>
                )}

            {portfolioSettings.intro_video_url && (
                <video
                    controls
                    preload="metadata"
                    className="w-full max-w-3xl rounded-xl border shadow"
                >
                    <source
                        src={portfolioSettings.intro_video_url}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}