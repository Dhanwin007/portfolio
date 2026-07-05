interface DashboardPageProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export function DashboardPage({
    title,
    description,
    children,
}: DashboardPageProps) {

    return (

        <section className="space-y-8">

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-white
                    "
                >
                    {title}
                </h1>

                <p className="mt-2 text-zinc-400">
                    {description}
                </p>

            </div>

            {children}

        </section>

    );

}