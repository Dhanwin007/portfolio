export interface Achievement {

    id: string;

    profile_id: string;

    title: string;

    description: string | null;

    achievement_date: string | null;

    display_order: number;

    created_at: string;

    updated_at: string;

}

export interface AddAchievementPayload {

    title: string;

    description: string | null;

    achievement_date: string | null;

}

export interface UpdateAchievementPayload {

    id: string;

    title: string;

    description: string | null;

    achievement_date: string | null;

}