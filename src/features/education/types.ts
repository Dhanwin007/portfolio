export interface Education {

    id: number;

    profile_id: string;

    institution: string;

    degree: string;

    field: string | null;

    grade: string | null;

    start_date: string | null;

    end_date: string | null;

    description: string | null;

    display_order: number;

}

export interface AddEducationPayload {

    institution: string;

    degree: string;

    field: string;

    grade: string;

    start_date: string;

    end_date: string;

    description: string;

}

export interface UpdateEducationPayload {

    id: number;

    institution: string;

    degree: string;

    field: string;

    grade: string;

    start_date: string;

    end_date: string;

    description: string;

}