import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/features/profile/types";

interface HeroProfileProps {
    profile: Profile;
}

export default function HeroProfile({
    profile,
}: HeroProfileProps) {
    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage
                    src={profile.avatar_url ?? ""}
                    alt={profile.display_name}
                />
                <AvatarFallback>
                    {profile.display_name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                    {profile.display_name}
                </h1>
                <p className="text-muted-foreground">
                    @{profile.username}
                </p>
                {profile.headline && (
                    <p className="text-lg font-medium">
                        {profile.headline}
                    </p>
                )}
                {profile.bio && (
                    <p className="max-w-2xl text-muted-foreground">
                        {profile.bio}
                    </p>
                )}
                <Badge>
                    {profile.current_status}
                </Badge>
            </div>
        </div>
    );
}