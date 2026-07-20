import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaGlobe,
    FaHackerrank,
    FaYoutube,
    FaXTwitter,
} from "react-icons/fa6";
import {
    SiLeetcode,
    SiCodeforces,
} from "react-icons/si";

import type { SocialLinks } from "@/features/social-links/types";

interface HeroSocialLinksProps {
    socialLinks: SocialLinks | null;
}

export default function HeroSocialLinks({
    socialLinks,
}: HeroSocialLinksProps) {
    if (!socialLinks) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-5">
            {socialLinks.github && (
                <Link
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <FaGithub className="h-6 w-6" />
                </Link>
            )}

            {socialLinks.linkedin && (
                <Link
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <FaLinkedin className="h-6 w-6" />
                </Link>
            )}

            {socialLinks.portfolio && (
                <Link
                    href={socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <FaGlobe className="h-6 w-6" />
                </Link>
            )}

            {socialLinks.leetcode && (
                <Link
                    href={socialLinks.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <SiLeetcode className="h-6 w-6" />
                </Link>
            )}

            {socialLinks.codeforces && (
                <Link
                    href={socialLinks.codeforces}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <SiCodeforces className="h-6 w-6" />
                </Link>
            )}

            {socialLinks.hackerrank && (
                <Link
                    href={socialLinks.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <FaHackerrank className="h-6 w-6" />
                </Link>
            )}

            {socialLinks.youtube && (
                <Link
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <FaYoutube className="h-6 w-6" />
                </Link>
            )}

            {socialLinks.twitter && (
                <Link
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                >
                    <FaXTwitter className="h-6 w-6" />
                </Link>
            )}
        </div>
    );
}