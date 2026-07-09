// src/features/certificates/validations/certificate.schema.ts

import { z } from "zod";

export const certificateSchema = z.object({

    title: z

        .string()

        .trim()

        .min(
            1,
            "Certificate title is required."
        )

        .max(
            150,
            "Certificate title must be at most 150 characters."
        ),

    issuer: z

        .string()

        .trim()

        .max(
            150,
            "Issuer must be at most 150 characters."
        ),

  issue_date: z
    .string()
    .refine(
        value =>
            value === "" ||
            !isNaN(Date.parse(value)),
        {
            message: "Enter a valid issue date.",
        }
    ),

    credential_url: z

        .union([

            z.literal(""),

           z.url({
    message: "Enter a valid URL.",
})

        ]),

    certificate_file_url: z

        .union([

            z.literal(""),

          z.url({
    message: "Enter a valid URL.",
})

        ]),

});

export type CertificateFormValues =
    z.infer<
        typeof certificateSchema
    >;