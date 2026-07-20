import Image from "next/image";

interface HeroCoverProps {
    coverUrl: string | null;
    displayName: string;
}

export default function HeroCover({
    coverUrl,
    displayName,
}: HeroCoverProps) {
    if (!coverUrl) {
        return (
            <div className="h-64 w-full rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background" />
        );
    }

    return (
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
            <img
    src={coverUrl}
    alt={`${displayName} cover`}
    className="h-full w-full object-cover"
/>
        </div>
    );
}