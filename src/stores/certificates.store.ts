import { create } from "zustand";

import type {

    Certificate,

    AddCertificatePayload,

    UpdateCertificatePayload,

} from "@/features/certificates/types";

import {

    certificatesService,

} from "@/services/certificates/certificates.service";

interface CertificatesState {

    certificates: Certificate[];

    publicCertificates: Certificate[];

    loading: boolean;

    error: string | null;

    fetchCertificates: () => Promise<boolean>;

    fetchPublicCertificates: (
        username: string
    ) => Promise<boolean>;

    addCertificate: (
        payload: AddCertificatePayload
    ) => Promise<boolean>;
    uploadCertificate: (
    file: File
) => Promise<string | null>;

    updateCertificate: (
        payload: UpdateCertificatePayload
    ) => Promise<boolean>;

    deleteCertificate: (
        id: string
    ) => Promise<boolean>;

    clearCertificates: () => void;

    clearPublicCertificates: () => void;

    clearError: () => void;

}

export const certificatesStore =
create<CertificatesState>((set) => ({

    certificates: [],

    publicCertificates: [],

    loading: false,

    error: null,

    async fetchCertificates() {

        set({

            loading: true,

            error: null,

        });

        const {

            data,

            error,

        } =
        await certificatesService.fetchCertificates();

        if (error) {

            set({

                loading: false,

                error: error.message,

            });

            return false;

        }

        set({

            certificates:
                data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async fetchPublicCertificates(
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
        await certificatesService.fetchPublicCertificates(
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

            publicCertificates:
                data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async addCertificate(
        payload
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await certificatesService.addCertificate(
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
            await certificatesService.fetchCertificates();

        set({

            certificates:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },
    async uploadCertificate(
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
    await certificatesService.uploadCertificate(
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

    async updateCertificate(
        payload
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await certificatesService.updateCertificate(
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
            await certificatesService.fetchCertificates();

        set({

            certificates:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    async deleteCertificate(
        id
    ) {

        set({

            loading: true,

            error: null,

        });

        const {

            error,

        } =
        await certificatesService.deleteCertificate(
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
            await certificatesService.fetchCertificates();

        set({

            certificates:
                refresh.data ?? [],

            loading: false,

            error: null,

        });

        return true;

    },

    clearCertificates() {

        set({

            certificates: [],

        });

    },

    clearPublicCertificates() {

        set({

            publicCertificates: [],

        });

    },

    clearError() {

        set({

            error: null,

        });

    },

}));