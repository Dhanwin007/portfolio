export interface SocialLinks {

    profile_id: string;

    github: string | null;

    linkedin: string | null;

    portfolio: string | null;

    leetcode: string | null;

    codeforces: string | null;

    hackerrank: string | null;

    youtube: string | null;

    twitter: string | null;

    created_at: string;

    updated_at: string;

}

export interface UpdateSocialLinksPayload {

    github: string;

    linkedin: string;

    portfolio: string;

    leetcode: string;

    codeforces: string;

    hackerrank: string;

    youtube: string;

    twitter: string;

}