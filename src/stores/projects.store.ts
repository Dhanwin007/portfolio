import { create } from "zustand";

import type {
    Project,
    Technology,
    AddProjectPayload,
    UpdateProjectPayload,
} from "@/features/projects/types";

import {
    projectsService,
} from "@/services/projects/projects.service";

interface ProjectsState {

    // Dashboard

    projects: Project[];

    // Public Portfolio

    publicProjects: Project[];

    loading: boolean;

    error: string | null;

    fetchProjects: () => Promise<boolean>;

    fetchPublicProjects: (
        username: string
    ) => Promise<boolean>;

    uploadProjectImage: (
        file: File
    ) => Promise<string | null>;

    uploadProjectVideo: (
        file: File
    ) => Promise<string | null>;

    addProject: (
        payload: AddProjectPayload
    ) => Promise<boolean>;

    updateProject: (
        payload: UpdateProjectPayload
    ) => Promise<boolean>;

    deleteProject: (
        id: string
    ) => Promise<boolean>;

    createTechnology: (
    name: string
) => Promise<Technology | null>; 
    clearProjects: () => void;

    clearPublicProjects: () => void;

    clearError: () => void;

}

export const projectsStore =
create<ProjectsState>((set) => ({

    projects: [],

    publicProjects: [],

    loading: false,

    error: null,

    async fetchProjects() {

        set({

            loading: true,

            error: null,

        });

        const {

            data,

            error,

        } =
        await projectsService.fetchProjects();

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return false;

        }

        set({

            projects:
                data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async fetchPublicProjects(
        username
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            data,

            error,

        } =
        await projectsService.fetchPublicProjects(
            username
        );

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return false;

        }

        set({

            publicProjects:
                data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async uploadProjectImage(
        file
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            data,

            error,

        } =
        await projectsService.uploadProjectImage(
            file
        );

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return null;

        }

        set({

            loading: false,

            error: null,

        });

        return data;

    },

    async uploadProjectVideo(
        file
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            data,

            error,

        } =
        await projectsService.uploadProjectVideo(
            file
        );

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return null;

        }

        set({

            loading: false,

            error: null,

        });

        return data;

    },
        async addProject(
        payload
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await projectsService.addProject(
            payload
        );

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return false;

        }

        const refresh =
            await projectsService.fetchProjects();

        set({

            projects:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async updateProject(
        payload
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await projectsService.updateProject(
            payload
        );

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return false;

        }

        const refresh =
            await projectsService.fetchProjects();

        set({

            projects:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },
    async createTechnology(
    name
) {

    const {
        data,
        error,
    } =
    await projectsService.createTechnology(
        name
    );

    if (error) {

        set({

            error: error.message,

        });

        return null;

    }

    return data;

},

    async deleteProject(
        id
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await projectsService.deleteProject(
            id
        );

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return false;

        }

        const refresh =
            await projectsService.fetchProjects();

        set({

            projects:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    clearProjects() {

        set({

            projects: [],

        });

    },

    clearPublicProjects() {

        set({

            publicProjects: [],

        });

    },

    clearError() {

        set({

            error: null,

        });

    },

}));