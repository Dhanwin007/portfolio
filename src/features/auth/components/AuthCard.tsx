// src/features/auth/components/AuthCard.tsx

import { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
    title: string;
    description: string;
    children: ReactNode;
}

export function AuthCard({
    title,
    description,
    children,
}: AuthCardProps) {
    return (
        <Card className="w-full max-w-md shadow-xl border">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-bold text-center">
                    {title}
                </CardTitle>

                <CardDescription className="text-center">
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">{children}</CardContent>
        </Card>
    );
}