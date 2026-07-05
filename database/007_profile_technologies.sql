CREATE TABLE profile_technologies (

    profile_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    technology_id UUID NOT NULL
        REFERENCES technologies(id)
        ON DELETE CASCADE,

    PRIMARY KEY (
        profile_id,
        technology_id
    )

);