"use client";

import type {
    Certificate,
} from "../types";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { CertificateForm } from "./CertificateForm";

interface CertificateDialogProps {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    certificate?: Certificate | null;

}

export function CertificateDialog({

    open,

    onOpenChange,

    certificate,

}: CertificateDialogProps) {

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent
                className="
                    border-white/10
                    bg-zinc-950
                    text-white
                    sm:max-w-3xl
                "
            >

                <DialogHeader>

                    <DialogTitle>

                        {certificate
                            ? "Edit Certificate"
                            : "Add Certificate"}

                    </DialogTitle>

                    <DialogDescription
                        className="text-zinc-400"
                    >

                        {certificate
                            ? "Update your certificate."
                            : "Add a new certificate to your portfolio."}

                    </DialogDescription>

                </DialogHeader>

                <CertificateForm
                    certificate={certificate}
                    onSuccess={() => {
                        onOpenChange(false);
                    }}
                />

            </DialogContent>

        </Dialog>

    );

}