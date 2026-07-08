"use client";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { SkillsForm } from "@/features/skills/components/SkillsForm";

export default function SkillsPage() {

    return (

        <DashboardPage

            title="Skills"

            description="Manage your technical skills."

        >

            <SkillsForm />

        </DashboardPage>

    );

}