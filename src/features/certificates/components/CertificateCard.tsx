"use client";

import type {
    Certificate,
} from "../types";

import { Button } from "@/components/ui/button";

interface CertificateCardProps {

    certificate: Certificate;

    onEdit: (
        certificate: Certificate
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

export function CertificateCard({

    certificate,

    onEdit,

    onDelete,

}: CertificateCardProps) {

    return (

        <div

            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6

                transition-all
                duration-300

                hover:border-violet-500/40
                hover:bg-white/10
            "

        >

            <div

                className="
                    flex
                    items-start
                    justify-between
                    gap-6
                "

            >

                <div className="space-y-2 flex-1">

                    <h3

                        className="
                            text-xl
                            font-semibold
                            text-white
                        "

                    >

                        {certificate.title}

                    </h3>

                    <p className="text-zinc-300">

                        {certificate.issuer}

                    </p>

                    {

                        certificate.issue_date && (

                            <p className="text-sm text-zinc-500">

                                Issued on {certificate.issue_date}

                            </p>

                        )

                    }

                    {


                    }

                    {

                        certificate.credential_url && (

                            <a

                                href={
                                    certificate.credential_url
                                }

                                target="_blank"

                                rel="noopener noreferrer"

                                className="
                                    inline-flex
                                    items-center
                                    text-sm
                                    font-medium
                                    text-violet-400

                                    hover:text-violet-300
                                "

                            >

                                🔗 View Credential

                            </a>

                        )

                    }

                </div>

                <div

                    className="
                        flex
                        flex-col
                        gap-3
                    "

                >

                    <Button

                        onClick={() =>
                            onEdit(
                                certificate
                            )
                        }

                    >

                        Edit

                    </Button>

                    <Button

                        variant="destructive"

                        onClick={() =>
                            onDelete(
                                certificate.id
                            )
                        }

                    >

                        Delete

                    </Button>

                </div>

            </div>

        </div>

    );

}