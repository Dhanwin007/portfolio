CREATE TABLE project_technologies (

    project_id UUID NOT NULL
        REFERENCES projects(id)
        ON DELETE CASCADE,

    technology_id UUID NOT NULL
        REFERENCES technologies(id)
        ON DELETE CASCADE,

    PRIMARY KEY (
        project_id,
        technology_id
    )

);