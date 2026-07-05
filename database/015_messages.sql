CREATE TABLE messages (

    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    visitor_name TEXT NOT NULL,

    visitor_email TEXT NOT NULL,

    subject TEXT,

    message TEXT NOT NULL,

    is_read BOOLEAN
        DEFAULT FALSE,

    created_at TIMESTAMPTZ
        DEFAULT now()

);