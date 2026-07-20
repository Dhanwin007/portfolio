import { usePublicPortfolioStore } from "@/stores/public-portfolio.store";

import HeroActions from "./HeroActions";
import HeroCover from "./HeroCover";
import HeroProfile from "./HeroProfile";
import HeroSocialLinks from "./HeroSocialLinks";

export default function HeroSection() {
    const { portfolio } = usePublicPortfolioStore();

    if (!portfolio) {
        return null;
    }
    //console.log(portfolio.profile.cover_url);

    return (
        <section className="space-y-8">
            <HeroCover
                coverUrl={portfolio.profile.cover_url}
                displayName={portfolio.profile.display_name}
            />

            <HeroProfile
                profile={portfolio.profile}
            />

            <HeroSocialLinks
                socialLinks={portfolio.socialLinks}
            />

            <HeroActions
                portfolioSettings={portfolio.portfolioSettings}
            />
        </section>
    );
}