CREATE TABLE profiles (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL UNIQUE
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    username TEXT NOT NULL UNIQUE,

    display_name TEXT NOT NULL,

    headline TEXT,

    bio TEXT,

    avatar_url TEXT,

    cover_url TEXT,

    current_status portfolio_status
        DEFAULT 'available',

    is_published BOOLEAN
        DEFAULT FALSE,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()
);