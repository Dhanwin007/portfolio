export interface Location {

    profile_id: string;

    country: string | null;

    state: string | null;

    city: string | null;

    latitude: number | null;

    longitude: number | null;

    created_at: string;

    updated_at: string;

}

export interface UpdateLocationPayload {

    country: string;

    state: string;

    city: string;

}