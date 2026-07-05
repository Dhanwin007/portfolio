CREATE TABLE project_media (

    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL
        REFERENCES projects(id)
        ON DELETE CASCADE,

    image_url TEXT NOT NULL,

    display_order INTEGER
        DEFAULT 0,

    created_at TIMESTAMPTZ
        DEFAULT now()

);