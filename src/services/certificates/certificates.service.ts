import { supabase } from "@/lib/supabase/client";

import type {
    AddCertificatePayload,
    UpdateCertificatePayload,
} from "@/features/certificates/types";

class CertificatesService {

    // ==========================
    // Helpers
    // ==========================

    private async getProfileId() {

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
                    message:
                        "User not authenticated.",
                },
            };

        }

        return await supabase

            .from("profiles")

            .select("id")

            .eq(
                "user_id",
                user.id
            )

            .single();

    }

    // ==========================
    // Dashboard
    // ==========================

    async fetchCertificates() {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {
                data: null,
                error: profile.error,
            };

        }

        return await supabase

            .from("certificates")

            .select("*")

            .eq(
                "profile_id",
                profile.data.id
            )

            .order(
                "display_order",
                {
                    ascending: true,
                }
            );

    }

    async addCertificate(
        payload: AddCertificatePayload
    ) {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {
                error: profile.error,
            };

        }

        const {
            count,
            error: countError,
        } = await supabase

            .from("certificates")

            .select("*", {

                head: true,

                count: "exact",

            })

            .eq(
                "profile_id",
                profile.data.id
            );

        if (countError) {

            return {
                error: countError,
            };

        }

        return await supabase

            .from("certificates")

            .insert({

                profile_id:
                    profile.data.id,

                ...payload,

                display_order:
                    (count ?? 0) + 1,

            });

    }

    async updateCertificate(
        payload: UpdateCertificatePayload
    ) {

        const {

            id,

            ...certificate

        } = payload;

        return await supabase

            .from("certificates")

            .update(
                certificate
            )

            .eq(
                "id",
                id
            );

    }

    async deleteCertificate(
        id: string
    ) {

        return await supabase

            .from("certificates")

            .delete()

            .eq(
                "id",
                id
            );

    }

    // ==========================
    // Upload Certificate
    // ==========================

    async uploadCertificate(
        file: File
    ) {

        const profile =
            await this.getProfileId();

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        const extension =
            file.name
                .split(".")
                .pop();

        const fileName =

            `${profile.data.id}/${crypto.randomUUID()}.${extension}`;

        const upload =
            await supabase.storage

                .from("certificates")

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

        const {

            data,

        } = supabase.storage

            .from("certificates")

            .getPublicUrl(
                fileName
            );

        return {

            data:
                data.publicUrl,

            error: null,

        };

    }

    // ==========================
    // Public Portfolio
    // ==========================

    async fetchPublicCertificates(
        username: string
    ) {

        const profile =
            await supabase

                .from("profiles")

                .select("id")

                .eq(
                    "username",
                    username
                )

                .single();

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        return await supabase

            .from("certificates")

            .select("*")

            .eq(
                "profile_id",
                profile.data.id
            )

            .order(
                "display_order",
                {
                    ascending: true,
                }
            );

    }

}

export const certificatesService =
    new CertificatesService();