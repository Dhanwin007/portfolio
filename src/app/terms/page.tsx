import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TermsPage() {

    return (

        <main
            className="
                min-h-screen
                bg-gradient-to-br
                from-zinc-950
                via-zinc-900
                to-black
                px-6
                py-12
            "
        >

            <section
                className="
                    mx-auto
                    max-w-4xl

                    rounded-3xl
                    border
                    border-white/10

                    bg-white/5

                    p-8
                    md:p-12

                    backdrop-blur-xl
                "
            >

                <h1
                    className="
                        text-4xl
                        font-black
                        text-white

                        md:text-5xl
                    "
                >
                    Terms & Conditions
                </h1>

                <p className="mt-3 text-zinc-400">
                    Last updated: July 2026
                </p>

                <div
                    className="
                        mt-10
                        space-y-8

                        text-zinc-300
                        leading-8
                    "
                >

                    <section>

                        <h2 className="mb-3 text-2xl font-bold text-white">
                            1. Acceptance of Terms
                        </h2>

                        <p>
                            By creating an account and using Portfolio Builder,
                            you agree to these Terms and Conditions. If you do
                            not agree, please discontinue use of the platform.
                        </p>

                    </section>

                    <section>

                        <h2 className="mb-3 text-2xl font-bold text-white">
                            2. User Accounts
                        </h2>

                        <p>
                            You are responsible for maintaining the security of
                            your account credentials and for all activities
                            performed under your account.
                        </p>

                    </section>

                    <section>

                        <h2 className="mb-3 text-2xl font-bold text-white">
                            3. Acceptable Use
                        </h2>

                        <p>
                            You agree not to upload unlawful, offensive,
                            misleading, or copyrighted content without proper
                            authorization. Abuse of the platform may result in
                            suspension or permanent termination of your account.
                        </p>

                    </section>

                    <section>

                        <h2 className="mb-3 text-2xl font-bold text-white">
                            4. Intellectual Property
                        </h2>

                        <p>
                            You retain ownership of the portfolio content you
                            upload. By using this platform, you grant us the
                            permission necessary to store and display your
                            content as part of providing the service.
                        </p>

                    </section>

                    <section>

                        <h2 className="mb-3 text-2xl font-bold text-white">
                            5. Limitation of Liability
                        </h2>

                        <p>
                            Portfolio Builder is provided on an "as is" basis.
                            While we strive for reliability, we do not guarantee
                            uninterrupted availability or freedom from errors.
                        </p>

                    </section>

                    <section>

                        <h2 className="mb-3 text-2xl font-bold text-white">
                            6. Changes to These Terms
                        </h2>

                        <p>
                            These Terms may be updated periodically. Continued
                            use of the platform after updates constitutes
                            acceptance of the revised Terms.
                        </p>

                    </section>

                    <section>

                        <h2 className="mb-3 text-2xl font-bold text-white">
                            7. Contact
                        </h2>

                        <p>
                            For any questions regarding these Terms, please
                            contact the platform administrator.
                        </p>

                    </section>

                </div>

                <div className="mt-12">

                    <Button
                        asChild
                        variant="outline"
                        className="
                            border-white/20
                            bg-transparent
                            text-white

                            hover:bg-white/10
                        "
                    >

                        <Link href="/">

                            Back to Home

                        </Link>

                    </Button>

                </div>

            </section>

        </main>

    );

}