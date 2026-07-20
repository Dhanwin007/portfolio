import { achievementsService } from "@/services/achievements/achievements.service";
import { certificatesService } from "@/services/certificates/certificates.service";
import { educationService } from "@/services/education/education.service";
import { experienceService } from "@/services/experience/experience.service";
import { locationService } from "@/services/location/location.service";
import { portfolioSettingsService } from "@/services/portfolio-settings/portfolio-settings.service";
import { profileService } from "@/services/profile/profile.service";
import { projectsService } from "@/services/projects/projects.service";
import { skillsService } from "@/services/skills/skills.service";
import { socialLinksService } from "@/services/social-links/social-links.service";

import type { PublicPortfolio } from "@/features/public-portfolio/types";

//import type { PublicPortfolio } from "../types";

class PublicPortfolioService {

    async getPublicPortfolio(
        username: string
    ) {

        const [
            profile,
            portfolioSettings,
            socialLinks,
            location,
            skills,
            education,
            experience,
            projects,
            certificates,
            achievements,
        ] = await Promise.all([

            profileService.getPublicProfile(
                username
            ),

            portfolioSettingsService.getPublicPortfolioSettings(
                username
            ),

            socialLinksService.getPublicSocialLinks(
                username
            ),

            locationService.getPublicLocation(
                username
            ),

            skillsService.fetchPublicSkills(
                username
            ),

            educationService.fetchPublicEducations(
                username
            ),

            experienceService.fetchPublicExperiences(
                username
            ),

            projectsService.fetchPublicProjects(
                username
            ),

            certificatesService.fetchPublicCertificates(
                username
            ),

            achievementsService.fetchPublicAchievements(
                username
            ),

        ]);

        if (profile.error) {

            return {

                data: null,

                error: profile.error,

            };

        }

        const error =

            portfolioSettings.error ??
            socialLinks.error ??
            location.error ??
            skills.error ??
            education.error ??
            experience.error ??
            projects.error ??
            certificates.error ??
            achievements.error;

        if (error) {

            return {

                data: null,

                error,

            };

        }

        const data: PublicPortfolio = {

            profile:
                profile.data,

            portfolioSettings:
                portfolioSettings.data,

            socialLinks:
                socialLinks.data,

            location:
                location.data,

            skills:
                skills.data ?? [],

            education:
                education.data ?? [],

            experience:
                experience.data ?? [],

            projects:
                projects.data ?? [],

            certificates:
                certificates.data ?? [],

            achievements:
                achievements.data ?? [],

        };

        return {

            data,

            error: null,

        };

    }

}

export const publicPortfolioService =
    new PublicPortfolioService();