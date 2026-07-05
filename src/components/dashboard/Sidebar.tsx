"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    User,
    Globe,
    MapPin,
    Code2,
    Briefcase,
    GraduationCap,
    FolderGit2,
    Award,
    Trophy,
    Settings,
    Mail,
    LayoutDashboard,
} from "lucide-react";

const links = [
    {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
    },
    {
        href: "/dashboard/profile",
        label: "Profile",
        icon: User,
    },
    {
        href: "/dashboard/social-links",
        label: "Social Links",
        icon: Globe,
    },
    {
        href: "/dashboard/location",
        label: "Location",
        icon: MapPin,
    },
    {
        href: "/dashboard/skills",
        label: "Skills",
        icon: Code2,
    },
    {
        href: "/dashboard/experience",
        label: "Experience",
        icon: Briefcase,
    },
    {
        href: "/dashboard/education",
        label: "Education",
        icon: GraduationCap,
    },
    {
        href: "/dashboard/projects",
        label: "Projects",
        icon: FolderGit2,
    },
    {
        href: "/dashboard/certificates",
        label: "Certificates",
        icon: Award,
    },
    {
        href: "/dashboard/achievements",
        label: "Achievements",
        icon: Trophy,
    },
    {
        href: "/dashboard/messages",
        label: "Messages",
        icon: Mail,
    },
    {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
    },
];

export  function Sidebar() {

    const pathname = usePathname();

    return (

        <aside
            className="
                w-72
                border-r
                border-white/10
                bg-zinc-950
                p-6
            "
        >

            <h1
                className="
                    mb-10
                    text-2xl
                    font-bold
                    text-white
                "
            >
                Portfolio Builder
            </h1>

            <nav className="space-y-2">

                {links.map((link) => {

                    const Icon = link.icon;

                    const active =
                        pathname === link.href;

                    return (

                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3
                                transition

                                ${
                                    active
                                        ? "bg-violet-600 text-white"
                                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                }
                            `}
                        >

                            <Icon size={18} />

                            {link.label}

                        </Link>

                    );

                })}

            </nav>

        </aside>

    );

}