CREATE TABLE social_links (

    profile_id UUID PRIMARY KEY
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    github TEXT,

    linkedin TEXT,

    portfolio TEXT,

    leetcode TEXT,

    codeforces TEXT,

    hackerrank TEXT,

    youtube TEXT,

    twitter TEXT,

    created_at TIMESTAMPTZ
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        DEFAULT now()
);