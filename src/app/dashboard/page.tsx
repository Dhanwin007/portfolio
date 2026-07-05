export default function DashboardPage() {

    return (

        <div className="space-y-8">

            {/* Welcome */}

            <section
                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-gradient-to-r
                    from-violet-600/20
                    to-fuchsia-600/20
                    p-10
                "
            >

                <h1
                    className="
                        text-4xl
                        font-bold
                        text-white
                    "
                >
                    Welcome back 👋
                </h1>

                <p
                    className="
                        mt-4
                        max-w-3xl
                        text-lg
                        leading-8
                        text-zinc-300
                    "
                >
                    Continue building your professional portfolio.
                    Every section you complete helps recruiters and
                    employers understand your skills and experience
                    better.
                </p>

            </section>

            {/* Progress */}

            <section>

                <h2
                    className="
                        mb-5
                        text-xl
                        font-semibold
                        text-white
                    "
                >
                    Portfolio Progress
                </h2>

                <div
                    className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        p-6
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <span className="text-zinc-300">

                            0% Completed

                        </span>

                        <span className="text-zinc-500">

                            Start by completing your profile

                        </span>

                    </div>

                    <div
                        className="
                            mt-4
                            h-3
                            overflow-hidden
                            rounded-full
                            bg-zinc-800
                        "
                    >

                        <div
                            className="
                                h-full
                                w-0
                                rounded-full
                                bg-violet-500
                            "
                        />

                    </div>

                </div>

            </section>

            {/* Modules */}

            <section>

                <h2
                    className="
                        mb-5
                        text-xl
                        font-semibold
                        text-white
                    "
                >
                    Portfolio Sections
                </h2>

                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >

                    {[
                        "Profile",
                        "Social Links",
                        "Location",
                        "Skills",
                        "Experience",
                        "Education",
                        "Projects",
                        "Certificates",
                        "Achievements",
                    ].map((section) => (

                        <div
                            key={section}
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-6
                            "
                        >

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    text-white
                                "
                            >
                                {section}
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-zinc-400
                                "
                            >
                                Not completed
                            </p>

                        </div>

                    ))}

                </div>

            </section>

            {/* Publish */}

            <section
                className="
                    rounded-2xl
                    border
                    border-violet-500/20
                    bg-violet-500/10
                    p-6
                "
            >

                <h2
                    className="
                        text-xl
                        font-semibold
                        text-violet-300
                    "
                >
                    Publish Portfolio
                </h2>

                <p
                    className="
                        mt-3
                        text-zinc-300
                    "
                >
                    Your portfolio is currently unpublished.
                    Complete the sections above and publish it
                    when you're ready to share it.
                </p>

            </section>

        </div>

    );

}