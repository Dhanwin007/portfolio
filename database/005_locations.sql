CREATE TABLE locations (

    profile_id UUID PRIMARY KEY
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    country TEXT,

    state TEXT,

    city TEXT,

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()
);