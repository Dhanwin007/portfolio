import type { PortfolioSettings } from "@/features/portfolio-settings/types";
import type { Profile } from "@/features/profile/types";
import type { SocialLinks } from "@/features/social-links/types";
import type { Location } from "@/features/location/types";
import type { Skill } from "@/features/skills/types";
import type { Education } from "@/features/education/types";
import type { Experience } from "@/features/experience/types";
import type { Project } from "@/features/projects/types";
import type { Certificate } from "@/features/certificates/types";
import type { Achievement } from "@/features/achievements/types";
export interface PublicPortfolio {
    profile: Profile;
    portfolioSettings: PortfolioSettings | null;
    socialLinks: SocialLinks | null;
    location: Location | null;
    skills: Skill[];
    education: Education[];
    experience: Experience[];
    projects: Project[];
    certificates: Certificate[];
    achievements: Achievement[];
}