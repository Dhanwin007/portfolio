import { Badge } from "@/components/ui/badge";

import { usePublicPortfolioStore } from "@/stores/public-portfolio.store";

export default function SkillsSection() {
    const { portfolio } = usePublicPortfolioStore();

    if (!portfolio || portfolio.skills.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold">
                Skills
            </h2>

            <div className="flex flex-wrap gap-3">
                {portfolio.skills.map((skill) => (
                    <Badge
                        key={skill.technology_id}
                        variant="secondary"
                        className="gap-2 px-4 py-2"
                    >
                        {skill.icon && (
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                className="h-4 w-4"
                            />
                        )}

                        {skill.website ? (
                            <a
                                href={skill.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {skill.name}
                            </a>
                        ) : (
                            skill.name
                        )}
                    </Badge>
                ))}
            </div>
        </section>
    );
}