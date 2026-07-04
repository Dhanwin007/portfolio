import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {

    return (

        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center

                bg-gradient-to-br
                from-zinc-950
                via-zinc-900
                to-black

                px-6
            "
        >

            <section
                className="
                    w-full
                    max-w-3xl

                    rounded-3xl
                    border
                    border-white/10

                    bg-white/5
                    p-10

                    text-center

                    backdrop-blur-xl
                "
            >

                <p
                    className="
                        mb-4

                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.45em]

                        text-violet-400
                    "
                >
                    Build • Customize • Share
                </p>

                <h1
                    className="
                        text-6xl
                        font-black
                        tracking-tight

                        text-white

                        md:text-8xl
                    "
                >
                    Portfolio
                    <br />
                    Builder
                </h1>

                <p
                    className="
                        mx-auto
                        mt-8
                        max-w-xl

                        text-lg
                        leading-8

                        text-zinc-400
                    "
                >
                    Create a beautiful professional portfolio,
                    showcase your work, and share it with the
                    world—all from one modern platform.
                </p>

                <div
                    className="
                        mt-12

                        flex
                        flex-col
                        justify-center
                        gap-4

                        sm:flex-row
                    "
                >

                    <Button
                        asChild
                        size="lg"
                        className="
                            h-12
                            rounded-xl

                            bg-gradient-to-r
                            from-violet-600
                            to-fuchsia-600

                            px-8
                            text-base
                        "
                    >

                        <Link href="/register">

                            Get Started

                        </Link>

                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="
                            h-12
                            rounded-xl

                            border-white/20
                            bg-transparent

                            px-8

                            text-white

                            hover:bg-white/10
                        "
                    >

                        <Link href="/login">

                            Login

                        </Link>

                    </Button>

                </div>

            </section>

        </main>

    );

}