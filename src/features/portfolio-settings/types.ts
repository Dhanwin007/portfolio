export type PortfolioTheme =
    | "light"
    | "dark"
    | "system";

export interface PortfolioSettings {

    profile_id: string;

    theme: PortfolioTheme;

    resume_url: string | null;

    intro_video_url: string | null;

    allow_resume_download: boolean;

    allow_messages: boolean;

    show_location: boolean;

    created_at: string;

    updated_at: string;

}

export interface UpdatePortfolioSettingsPayload {

    theme: PortfolioTheme;

    resume_url: string | null;

    intro_video_url: string | null;

    allow_resume_download: boolean;

    allow_messages: boolean;

    show_location: boolean;

}

export interface UploadResumeResponse {

    url: string;

}

export interface UploadIntroVideoResponse {

    url: string;

}