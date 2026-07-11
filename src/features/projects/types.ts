export interface Technology {

    id: string;

    name: string;

    icon: string | null;

    website: string | null;

    created_at: string;

}

export interface ProjectMedia {

    id: string;

    project_id: string;

    image_url: string;

    display_order: number;

    created_at: string;

}

export interface Project {

    id: string;

    profile_id: string;

    title: string;

    short_description: string | null;

    full_description: string | null;

    github_url: string | null;

    live_demo_url: string | null;

    demo_video_url: string | null;

    featured: boolean;

    display_order: number;

    created_at: string;

    updated_at: string;

    technologies: Technology[];

    media: ProjectMedia[];

}

export interface AddProjectPayload {

    title: string;

    short_description: string;

    full_description: string;

    github_url: string;

    live_demo_url: string;

    demo_video_url: string;

    featured: boolean;

    technologies: string[];

    media: string[];

}

export interface UpdateProjectPayload {

    id: string;

    title: string;

    short_description: string;

    full_description: string;

    github_url: string;

    live_demo_url: string;

    demo_video_url: string;

    featured: boolean;

    technologies: string[];

    media: string[];

}