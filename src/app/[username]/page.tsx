"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import HeroSection from "@/features/public-portfolio/components/hero/HeroSection";
import SkillsSection from "@/features/public-portfolio/components/skills/SkillsSection";
// import ProjectsSection from "@/features/public-portfolio/components/projects-section";
// import ExperienceSection from "@/features/public-portfolio/components/experience-section";
// import EducationSection from "@/features/public-portfolio/components/education-section";
// import CertificatesSection from "@/features/public-portfolio/components/certificates-section";
// import AchievementsSection from "@/features/public-portfolio/components/achievements-section";

import { usePublicPortfolioStore } from "@/stores/public-portfolio.store";

export default function PublicPortfolioPage() {
    const { username } = useParams<{
        username: string;
    }>();

    const {
        portfolio,
        loading,
        error,
        fetchPublicPortfolio,
    } = usePublicPortfolioStore();

    useEffect(() => {
        if (typeof username === "string") {
            fetchPublicPortfolio(username);
        }
    }, [
        username,
        fetchPublicPortfolio,
    ]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                Loading portfolio...
            </main>
        );
    }

    if (error || !portfolio) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                Portfolio not found.
            </main>
        );
    }

    return (
        <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-12 px-6 py-10">
            <HeroSection />
            <SkillsSection />
            {/* <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <CertificatesSection />
            <AchievementsSection /> */}
        </main>
    );
}