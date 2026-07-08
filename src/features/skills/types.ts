// src/features/skills/types.ts

export interface Technology {

    id: number;

    name: string;

    icon: string | null;

    website: string | null;

}

export interface Skill {

    technology_id: number;

    name: string;

    icon: string | null;

    website: string | null;

}

export interface AddSkillPayload {

    name: string;

}

export interface UpdateSkillPayload {

    oldTechnologyId: number;

    newSkillName: string;

}