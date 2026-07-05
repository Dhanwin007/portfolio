CREATE TABLE experience (

    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    company TEXT NOT NULL,

    position TEXT NOT NULL,

    employment_type employment_type,

    location TEXT,

    start_date DATE,

    end_date DATE,

    currently_working BOOLEAN
        DEFAULT FALSE,

    description TEXT,

    display_order INTEGER
        DEFAULT 0,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()

);