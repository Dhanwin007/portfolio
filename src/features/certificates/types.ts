export interface Certificate {

    id: string;

    profile_id: string;

    title: string;

    issuer: string | null;

    issue_date: string | null;

    credential_url: string | null;

    certificate_file_url: string | null;

    display_order: number;

    created_at: string;

    updated_at: string;

}

export interface AddCertificatePayload {

    title: string;

    issuer: string | null;

    issue_date: string | null;

    credential_url: string | null;

    certificate_file_url: string | null;

}

export interface UpdateCertificatePayload {

    id: string;

    title: string;

    issuer: string | null;

    issue_date: string | null;

    credential_url: string | null;

    certificate_file_url: string | null;

}