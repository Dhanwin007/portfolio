CREATE TABLE projects (

    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    short_description TEXT,

    full_description TEXT,

    github_url TEXT,

    live_demo_url TEXT,

    demo_video_url TEXT,

    featured BOOLEAN
        DEFAULT FALSE,

    display_order INTEGER
        DEFAULT 0,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()

);