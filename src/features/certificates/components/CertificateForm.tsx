"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    certificateSchema,
    type CertificateFormValues,
} from "../validations/certificate.schema";

import type {
    Certificate,
} from "../types";

import { certificatesStore } from "@/stores/certificates.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FileUploader } from "@/components/shared/FileUploader";

interface CertificateFormProps {

    certificate?: Certificate | null;

    onSuccess: () => void;

}

export function CertificateForm({

    certificate,

    onSuccess,

}: CertificateFormProps) {

    const addCertificate =
        certificatesStore(
            state => state.addCertificate
        );

    const updateCertificate =
        certificatesStore(
            state => state.updateCertificate
        );

    const uploadCertificate =
        certificatesStore(
            state => state.uploadCertificate
        );

    const loading =
        certificatesStore(
            state => state.loading
        );

    const error =
        certificatesStore(
            state => state.error
        );

    const clearError =
        certificatesStore(
            state => state.clearError
        );

    const {

        register,

        reset,

        watch,

        setValue,

        handleSubmit,

        formState: {

            errors,

        },

    } = useForm<CertificateFormValues>({

        resolver:
            zodResolver(
                certificateSchema
            ),

        defaultValues: {

            title: "",

            issuer: "",

            issue_date: "",

            credential_url: "",

            certificate_file_url: "",

        },

    });

    useEffect(() => {

        if (!certificate) {

            reset({

                title: "",

                issuer: "",

                issue_date: "",

                credential_url: "",

                certificate_file_url: "",

            });

            return;

        }

        reset({

            title:
                certificate.title,

            issuer:
                certificate.issuer ?? "",

            issue_date:
                certificate.issue_date ?? "",

            credential_url:
                certificate.credential_url ?? "",

            certificate_file_url:
                certificate.certificate_file_url ?? "",

        });

    }, [

        certificate,

        reset,

    ]);

    const onSubmit:
        SubmitHandler<
            CertificateFormValues
        > = async (data) => {

        clearError();

        const success =
            certificate

                ? await updateCertificate({

                    id:
                        certificate.id,

                    ...data,

                })

                : await addCertificate(
                    data
                );

        if (!success) {

            return;

        }

        toast.success(

            certificate

                ? "Certificate updated."

                : "Certificate added."

        );

        onSuccess();

    };

    return (

        <form

            onSubmit={
                handleSubmit(
                    onSubmit
                )
            }

            className="space-y-6"

        >

            <div className="space-y-2">

                <Label>

                    Certificate Title

                </Label>

                <Input

                    {...register(
                        "title"
                    )}

                />

                {

                    errors.title && (

                        <p className="text-sm text-red-400">

                            {errors.title.message}

                        </p>

                    )

                }

            </div>

            <div className="space-y-2">

                <Label>

                    Issuer

                </Label>

                <Input

                    {...register(
                        "issuer"
                    )}

                />

                {

                    errors.issuer && (

                        <p className="text-sm text-red-400">

                            {errors.issuer.message}

                        </p>

                    )

                }

            </div>

            <div className="space-y-2">

                <Label>

                    Issue Date

                </Label>

                <Input

                    type="date"

                    {...register(
                        "issue_date"
                    )}

                />

            </div>

            <div className="space-y-2">

                <Label>

                    Credential URL

                </Label>

                <Input

                    placeholder="https://..."

                    {...register(
                        "credential_url"
                    )}

                />

                {

                    errors.credential_url && (

                        <p className="text-sm text-red-400">

                            {

                                errors
                                    .credential_url
                                    .message

                            }

                        </p>

                    )

                }

            </div>
                        <FileUploader

                label="Certificate File"

                accept="
                    application/pdf,
                    image/png,
                    image/jpeg,
                    image/webp
                "

                currentUrl={
                    watch(
                        "certificate_file_url"
                    )
                }

                onUpload={
                    uploadCertificate
                }

                onUploaded={(url) =>

                    setValue(

                        "certificate_file_url",

                        url,

                        {

                            shouldValidate: true,

                            shouldDirty: true,

                        }

                    )

                }

            />

            {

                errors.certificate_file_url && (

                    <p className="text-sm text-red-400">

                        {

                            errors
                                .certificate_file_url
                                .message

                        }

                    </p>

                )

            }

            {

                error && (

                    <p className="text-red-400">

                        {error}

                    </p>

                )

            }

            <div

                className="
                    flex
                    justify-end
                "

            >

                <Button

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Saving..."

                            : certificate

                                ? "Update Certificate"

                                : "Add Certificate"

                    }

                </Button>

            </div>

        </form>

    );

}