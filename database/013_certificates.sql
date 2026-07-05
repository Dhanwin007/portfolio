CREATE TABLE certificates (

    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    issuer TEXT,

    issue_date DATE,

    credential_url TEXT,

    certificate_file_url TEXT,

    display_order INTEGER
        DEFAULT 0,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()

);