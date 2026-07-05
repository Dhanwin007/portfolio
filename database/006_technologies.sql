CREATE TABLE technologies (

    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,

    icon TEXT,

    website TEXT,

    created_at TIMESTAMPTZ
        DEFAULT now()

);