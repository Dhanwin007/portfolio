export type EmploymentType =
    | "full_time"
    | "part_time"
    | "internship"
    | "contract"
    | "freelance"
    | "self_employed"
    | "temporary"
    | "volunteer"
    | "other";

export interface Experience {

    id: string;

    profile_id: string;

    company: string;

    position: string;

    employment_type: EmploymentType;

    location: string | null;

    start_date: string | null;

    end_date: string | null;

    currently_working: boolean;

    description: string | null;

    display_order: number;

}

export interface AddExperiencePayload {

    company: string;

    position: string;

    employment_type: EmploymentType;

    location: string;

    start_date: string;

    end_date: string;

    currently_working: boolean;

    description: string;

}

export interface UpdateExperiencePayload {

    id: string;

    company: string;

    position: string;

    employment_type: EmploymentType;

    location: string;

    start_date: string;

    end_date: string;

    currently_working: boolean;

    description: string;

}