"use client";

import { Button } from "@/components/ui/button";

export function OAuthButtons() {
    return (
        <div className="space-y-3">
            <Button
                variant="outline"
                className="w-full"
                type="button"
            >
                Continue with Google
            </Button>

            <Button
                variant="outline"
                className="w-full"
                type="button"
            >
                Continue with GitHub
            </Button>
        </div>
    );
}