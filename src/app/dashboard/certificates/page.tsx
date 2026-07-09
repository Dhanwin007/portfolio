"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { Button } from "@/components/ui/button";

import { CertificateCard } from "@/features/certificates/components/CertificateCard";
import { CertificateDialog } from "@/features/certificates/components/CertificateDialog";

import type {
    Certificate,
} from "@/features/certificates/types";

import { certificatesStore } from "@/stores/certificates.store";

export default function CertificatesPage() {

    const certificates =
        certificatesStore(
            state => state.certificates
        );

    const loading =
        certificatesStore(
            state => state.loading
        );

    const error =
        certificatesStore(
            state => state.error
        );

    const fetchCertificates =
        certificatesStore(
            state => state.fetchCertificates
        );

    const deleteCertificate =
        certificatesStore(
            state => state.deleteCertificate
        );

    const [

        open,

        setOpen,

    ] = useState(false);

    const [

        selectedCertificate,

        setSelectedCertificate,

    ] = useState<
        Certificate | null
    >(null);

    useEffect(() => {

        fetchCertificates();

    }, [fetchCertificates]);

    async function handleDelete(
        id: string
    ) {

        if (

            !window.confirm(
                "Delete this certificate?"
            )

        ) {

            return;

        }

        const success =
            await deleteCertificate(id);

        if (!success) {

            return;

        }

        toast.success(
            "Certificate deleted."
        );

    }

    function handleAdd() {

        setSelectedCertificate(
            null
        );

        setOpen(true);

    }

    function handleEdit(
        certificate: Certificate
    ) {

        setSelectedCertificate(
            certificate
        );

        setOpen(true);

    }

    return (

        <DashboardPage

            title="Certificates"

            description="Manage your professional certifications."

        >

            <div

                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-8
                "

            >

                <div

                    className="
                        mb-8
                        flex
                        items-center
                        justify-between
                    "

                >

                    <div>

                        <h2

                            className="
                                text-2xl
                                font-semibold
                                text-white
                            "

                        >

                            Certificates

                        </h2>

                        <p

                            className="
                                mt-2
                                text-zinc-400
                            "

                        >

                            Showcase your certifications.

                        </p>

                    </div>

                    <Button

                        onClick={
                            handleAdd
                        }

                    >

                        + Add Certificate

                    </Button>

                </div>

                {

                    loading ? (

                        <p className="text-zinc-400">

                            Loading...

                        </p>

                    ) : error ? (

                        <p className="text-red-400">

                            {error}

                        </p>

                    ) : certificates.length === 0 ? (

                        <div

                            className="
                                rounded-2xl
                                border
                                border-dashed
                                border-white/10
                                py-16
                                text-center
                            "

                        >

                            <div className="text-5xl">

                                🏆

                            </div>

                            <h3

                                className="
                                    mt-4
                                    text-xl
                                    font-semibold
                                    text-white
                                "

                            >

                                No certificates added yet

                            </h3>

                            <p

                                className="
                                    mt-2
                                    text-zinc-400
                                "

                            >

                                Click "Add Certificate"
                                to showcase your
                                certifications.

                            </p>

                        </div>

                    ) : (

                        <div

                            className="
                                space-y-5
                            "

                        >

                            {

                                certificates.map(

                                    certificate => (

                                        <CertificateCard

                                            key={
                                                certificate.id
                                            }

                                            certificate={
                                                certificate
                                            }

                                            onEdit={
                                                handleEdit
                                            }

                                            onDelete={
                                                handleDelete
                                            }

                                        />

                                    )

                                )

                            }

                        </div>

                    )

                }

            </div>

            <CertificateDialog

                open={open}

                onOpenChange={
                    setOpen
                }

                certificate={
                    selectedCertificate
                }

            />

        </DashboardPage>

    );

}