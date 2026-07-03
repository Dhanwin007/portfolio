CREATE TABLE portfolio_settings (

    profile_id UUID PRIMARY KEY
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    theme portfolio_theme
        DEFAULT 'system',

    resume_url TEXT,

    intro_video_url TEXT,

    allow_resume_download BOOLEAN
        DEFAULT TRUE,

    allow_messages BOOLEAN
        DEFAULT TRUE,

    show_location BOOLEAN
        DEFAULT TRUE,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()
);