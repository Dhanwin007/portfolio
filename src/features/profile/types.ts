// src/features/profile/types.ts

export type PortfolioStatus =
    | "available"
    | "open_to_work"
    | "open_to_internship"
    | "freelancing"
    | "busy";

export interface Profile {

    id: string;

    user_id: string;

    username: string;

    display_name: string;

    headline: string | null;

    bio: string | null;

    avatar_url: string | null;

    cover_url: string | null;

    current_status: PortfolioStatus;

    is_published: boolean;

    created_at: string;

    updated_at: string;

}

export interface UpdateProfilePayload {

    display_name: string;

    headline: string;

    bio: string;

    current_status: PortfolioStatus;

    is_published: boolean;

}