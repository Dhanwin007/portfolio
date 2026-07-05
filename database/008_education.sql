CREATE TABLE education (

    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    institution TEXT NOT NULL,

    degree TEXT NOT NULL,

    field TEXT,

    grade TEXT,

    start_date DATE,

    end_date DATE,

    description TEXT,

    display_order INTEGER
        DEFAULT 0,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()

);