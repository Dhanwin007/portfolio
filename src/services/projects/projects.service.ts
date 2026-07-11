import { supabase } from "@/lib/supabase/client";

import type {
    AddProjectPayload,
    UpdateProjectPayload,
    Project,
    Technology,
    ProjectMedia,
} from "@/features/projects/types";

interface ProjectTechnologyRelation {
    technology_id: string;
    technologies: Technology;
}

interface ProjectQueryResult {
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
    project_media: ProjectMedia[];
    project_technologies: ProjectTechnologyRelation[];
}

class ProjectsService {

    // ====================================
    // Helpers
    // ====================================

    private async getProfile() {

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
            return {
                data: null,
                error: authError,
            };
        }

        if (!user) {
            return {
                data: null,
                error: {
                    message: "User not authenticated.",
                },
            };
        }

        return await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", user.id)
            .single();

    }

    private getStoragePath(
        publicUrl: string,
        bucket: string
    ): string | null {

        try {

            const url = new URL(publicUrl);

            const marker = `/${bucket}/`;

            const index = url.pathname.indexOf(marker);

            if (index === -1) {
                return null;
            }

            return url.pathname.substring(
                index + marker.length
            );

        } catch {

            return null;

        }

    }

    private mapProject(
        project: ProjectQueryResult
    ): Project {

        return {

            id: project.id,

            profile_id: project.profile_id,

            title: project.title,

            short_description:
                project.short_description,

            full_description:
                project.full_description,

            github_url:
                project.github_url,

            live_demo_url:
                project.live_demo_url,

            demo_video_url:
                project.demo_video_url,

            featured:
                project.featured,

            display_order:
                project.display_order,

            created_at:
                project.created_at,

            updated_at:
                project.updated_at,

            media:
                project.project_media,

            technologies:
                project.project_technologies.map(
                    (
                        technology: ProjectTechnologyRelation
                    ) => technology.technologies
                ),

        };

    }

    // ====================================
    // Upload Image
    // ====================================

    async uploadProjectImage(
        file: File
    ) {

        const profile =
            await this.getProfile();

        if (profile.error) {
            return {
                data: null,
                error: profile.error,
            };
        }

        const extension =
            file.name.split(".").pop();

        const fileName =
            `${profile.data.id}/${crypto.randomUUID()}.${extension}`;

        const upload =
            await supabase.storage
                .from("project-images")
                .upload(
                    fileName,
                    file,
                    {
                        upsert: false,
                    }
                );

        if (upload.error) {
            return {
                data: null,
                error: upload.error,
            };
        }

        const { data } =
            supabase.storage
                .from("project-images")
                .getPublicUrl(fileName);

        return {
            data: data.publicUrl,
            error: null,
        };

    }

    // ====================================
    // Upload Video
    // ====================================

    async uploadProjectVideo(
        file: File
    ) {

        const profile =
            await this.getProfile();

        if (profile.error) {
            return {
                data: null,
                error: profile.error,
            };
        }

        const extension =
            file.name.split(".").pop();

        const fileName =
            `${profile.data.id}/${crypto.randomUUID()}.${extension}`;

        const upload =
            await supabase.storage
                .from("project-videos")
                .upload(
                    fileName,
                    file,
                    {
                        upsert: false,
                    }
                );

        if (upload.error) {
            return {
                data: null,
                error: upload.error,
            };
        }

        const { data } =
            supabase.storage
                .from("project-videos")
                .getPublicUrl(fileName);

        return {
            data: data.publicUrl,
            error: null,
        };

    }
        // ====================================
    // Dashboard
    // ====================================

    async fetchProjects() {

        const profile = await this.getProfile();

        if (profile.error) {
            return {
                data: null,
                error: profile.error,
            };
        }

        const { data, error } = await supabase
            .from("projects")
            .select(`
                *,
                project_media(*),
                project_technologies(
                    technology_id,
                    technologies(*)
                )
            `)
            .eq("profile_id", profile.data.id)
            .order("display_order", {
                ascending: true,
            });

        if (error) {
            return {
                data: null,
                error,
            };
        }

        const projects = (data as ProjectQueryResult[])
            .map(project => this.mapProject(project));

        return {
            data: projects,
            error: null,
        };

    }

    // ====================================
    // Public Portfolio
    // ====================================

    async fetchPublicProjects(
        username: string
    ) {

        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("id")
                .eq("username", username)
                .single();

        if (profileError) {
            return {
                data: null,
                error: profileError,
            };
        }

        const { data, error } = await supabase
            .from("projects")
            .select(`
                *,
                project_media(*),
                project_technologies(
                    technology_id,
                    technologies(*)
                )
            `)
            .eq("profile_id", profile.id)
            .order("display_order", {
                ascending: true,
            });

        if (error) {
            return {
                data: null,
                error,
            };
        }

        const projects = (data as ProjectQueryResult[])
            .map(project => this.mapProject(project));

        return {
            data: projects,
            error: null,
        };

    }
    // ====================================
// Add Project
// ====================================

async addProject(
    payload: AddProjectPayload
) {

    const profile = await this.getProfile();

    if (profile.error) {
        return {
            data: null,
            error: profile.error,
        };
    }

    const {
        technologies,
        media,
        ...project
    } = payload;

    const {
        count,
        error: countError,
    } = await supabase
        .from("projects")
        .select("*", {
            head: true,
            count: "exact",
        })
        .eq("profile_id", profile.data.id);

    if (countError) {
        return {
            data: null,
            error: countError,
        };
    }

    const {
        data: insertedProject,
        error: projectError,
    } = await supabase
        .from("projects")
        .insert({
            ...project,
            profile_id: profile.data.id,
            display_order: (count ?? 0) + 1,
        })
        .select()
        .single();

    if (projectError || !insertedProject) {
        return {
            data: null,
            error: projectError,
        };
    }

    if (technologies.length > 0) {

        const technologyRows = technologies.map(
            (technologyId: string) => ({
                project_id: insertedProject.id,
                technology_id: technologyId,
            })
        );

        const { error } = await supabase
            .from("project_technologies")
            .insert(technologyRows);

        if (error) {
            return {
                data: null,
                error,
            };
        }

    }

    if (media.length > 0) {

        const mediaRows = media.map(
            (
                imageUrl: string,
                index: number
            ) => ({
                project_id: insertedProject.id,
                image_url: imageUrl,
                display_order: index + 1,
            })
        );

        const { error } = await supabase
            .from("project_media")
            .insert(mediaRows);

        if (error) {
            return {
                data: null,
                error,
            };
        }

    }

    return {
        data: insertedProject,
        error: null,
    };

}

// ====================================
// Update Project
// ====================================

async updateProject(
    payload: UpdateProjectPayload
) {

    const {
        id,
        technologies,
        media,
        ...project
    } = payload;

    const { error: projectError } = await supabase
        .from("projects")
        .update(project)
        .eq("id", id);

    if (projectError) {
        return {
            data: null,
            error: projectError,
        };
    }

    const { error: deleteTechnologyError } =
        await supabase
            .from("project_technologies")
            .delete()
            .eq("project_id", id);

    if (deleteTechnologyError) {
        return {
            data: null,
            error: deleteTechnologyError,
        };
    }

    if (technologies.length > 0) {

        const technologyRows = technologies.map(
            (technologyId: string) => ({
                project_id: id,
                technology_id: technologyId,
            })
        );

        const { error } = await supabase
            .from("project_technologies")
            .insert(technologyRows);

        if (error) {
            return {
                data: null,
                error,
            };
        }

    }

    const { error: deleteMediaError } =
        await supabase
            .from("project_media")
            .delete()
            .eq("project_id", id);

    if (deleteMediaError) {
        return {
            data: null,
            error: deleteMediaError,
        };
    }

    if (media.length > 0) {

        const mediaRows = media.map(
            (
                imageUrl: string,
                index: number
            ) => ({
                project_id: id,
                image_url: imageUrl,
                display_order: index + 1,
            })
        );

        const { error } = await supabase
            .from("project_media")
            .insert(mediaRows);

        if (error) {
            return {
                data: null,
                error,
            };
        }

    }

    return {
        data: true,
        error: null,
    };

}
// ====================================
// Delete Project
// ====================================

async deleteProject(
    id: string
) {

    const { data: media } = await supabase
        .from("project_media")
        .select("image_url")
        .eq("project_id", id);

    const { data: project } = await supabase
        .from("projects")
        .select("demo_video_url")
        .eq("id", id)
        .single();

    // Delete project images from storage

    if (media) {

        const imagePaths = media
            .map((item: { image_url: string }) =>
                this.getStoragePath(
                    item.image_url,
                    "project-images"
                )
            )
            .filter(
                (path): path is string =>
                    path !== null
            );

        if (imagePaths.length > 0) {

            await supabase.storage
                .from("project-images")
                .remove(imagePaths);

        }

    }

    // Delete demo video from storage

    if (project?.demo_video_url) {

        const videoPath =
            this.getStoragePath(
                project.demo_video_url,
                "project-videos"
            );

        if (videoPath) {

            await supabase.storage
                .from("project-videos")
                .remove([
                    videoPath,
                ]);

        }

    }

    // Delete project
    // project_media and
    // project_technologies
    // are removed automatically
    // via ON DELETE CASCADE.

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

    return {
        data: !error,
        error,
    };

}
// ====================================
// Technologies
// ====================================

async searchTechnologies(
    query: string
) {

    if (!query.trim()) {

        return {
            data: [],
            error: null,
        };

    }

    return await supabase
        .from("technologies")
        .select("*")
        .ilike(
            "name",
            `%${query.trim()}%`
        )
        .order(
            "name",
            {
                ascending: true,
            }
        )
        .limit(8);

}

async createTechnology(
    name: string
) {

    const trimmed =
        name.trim();

    if (!trimmed) {

        return {
            data: null,
            error: {
                message:
                    "Technology name is required.",
            },
        };

    }

    const existing =
        await supabase
            .from("technologies")
            .select("*")
            .ilike(
                "name",
                trimmed
            )
            .maybeSingle();

    if (existing.data) {

        return {
            data: existing.data,
            error: null,
        };

    }

    const { data, error } =
        await supabase
            .from("technologies")
            .insert({
                name: trimmed,
            })
            .select()
            .single();

    return {
        data,
        error,
    };

}
}
export const projectsService =
    new ProjectsService();