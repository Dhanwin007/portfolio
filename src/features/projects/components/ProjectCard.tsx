"use client";

import { ExternalLink,  Pencil, Star, Trash2 } from "lucide-react";

import type {
    Project,
} from "../types";

import { Button } from "@/components/ui/button";

interface ProjectCardProps {

    project: Project;

    onEdit: (
        project: Project
    ) => void;

    onDelete: (
        id: string
    ) => void;

}
const Github = ({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function ProjectCard({

    project,

    onEdit,

    onDelete,

}: ProjectCardProps) {

    return (

        <div

            className="
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-zinc-900
                text-white
            "

        >

            <div

                className="
                    aspect-video
                    bg-zinc-800
                "

            >

                {

                    project.media.length > 0 ? (

                        <img

                            src={
                                project.media[0].image_url
                            }

                            alt={project.title}

                            className="
                                h-full
                                w-full
                                object-cover
                            "

                        />

                    ) : (

                        <div

                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                text-zinc-500
                                
                            "

                        >

                            No Image

                        </div>

                    )

                }

            </div>

            <div className="space-y-4 p-5">

                <div

                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "

                >

                    <div>

                        <h3

                            className="
                                text-xl
                                font-semibold
                            "

                        >

                            {project.title}

                        </h3>

                        {

                            project.short_description && (

                                <p

                                    className="
                                        mt-2
                                        text-sm
                                        text-zinc-400
                                    "

                                >

                                    {

                                        project.short_description

                                    }

                                </p>

                            )

                        }

                    </div>

                    {

                        project.featured && (

                            <div

                                className="
                                    flex
                                    items-center
                                    gap-1
                                    rounded-full
                                    bg-yellow-500/15
                                    px-3
                                    py-1
                                    text-xs
                                    text-yellow-400
                                "

                            >

                                <Star

                                    className="
                                        h-3
                                        w-3
                                        fill-current
                                    "

                                />

                                Featured

                            </div>

                        )

                    }

                </div>

                {

                    project.technologies.length > 0 && (

                        <div

                            className="
                                flex
                                flex-wrap
                                gap-2
                            "

                        >

                            {

                                project.technologies.map(

                                    technology => (

                                        <span

                                            key={
                                                technology.id
                                            }

                                            className="
                                                rounded-full
                                                bg-violet-500/10
                                                border
                                                border-violet-500/30
                                                px-3
                                                py-1
                                                text-xs
                                            "

                                        >

                                            {

                                                technology.name

                                            }

                                        </span>

                                    )

                                )

                            }

                        </div>

                    )

                }

                <div

                    className="
                        flex
                        flex-wrap
                        gap-3
                        text-black
                    "

                >

                    {

                        project.github_url && (

                            <Button

                                type="button"

                                variant="outline"

                                asChild

                            >

                                <a

                                    href={
                                        project.github_url
                                    }

                                    target="_blank"

                                    rel="noreferrer"

                                >

                                    <Github

                                        className="
                                            mr-2
                                            h-4
                                            w-4
                                        "

                                    />

                                    GitHub

                                </a>

                            </Button>

                        )

                    }

                    {

                        project.live_demo_url && (

                            <Button

                                type="button"

                                variant="outline"

                                asChild

                            >

                                <a

                                    href={
                                        project.live_demo_url
                                    }

                                    target="_blank"

                                    rel="noreferrer"

                                >

                                    <ExternalLink

                                        className="
                                            mr-2
                                            h-4
                                            w-4
                                        "

                                    />

                                    Live Demo

                                </a>

                            </Button>

                        )

                    }

                </div>

                <div

                    className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-white/10
                        pt-4
                        text-black
                    "

                >

                    <Button

                        type="button"

                        variant="outline"

                        onClick={() =>

                            onEdit(
                                project
                            )

                        }

                    >

                        <Pencil

                            className="
                                mr-2
                                h-4
                                w-4
                            "

                        />

                        Edit

                    </Button>

                    <Button

                        type="button"

                        variant="destructive"

                        onClick={() =>

                            onDelete(
                                project.id
                            )

                        }

                    >

                        <Trash2

                            className="
                                mr-2
                                h-4
                                w-4
                            "

                        />

                        Delete

                    </Button>

                </div>

            </div>

        </div>

    );

}