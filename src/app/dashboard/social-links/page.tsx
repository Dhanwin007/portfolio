"use client";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { SocialLinksForm } from "@/features/social-links/components/SocialLinksForm";

export default function SocialLinksPage() {

    return (

        <DashboardPage

            title="Social Links"

            description="Manage your social media and professional links."

        >

            <SocialLinksForm />

        </DashboardPage>

    );

}