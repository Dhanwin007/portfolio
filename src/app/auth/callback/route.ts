// src/app/auth/callback/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);

    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = await createClient();

        const { error } =
            await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error(error);

            return NextResponse.redirect(
                new URL(
                    "/forgot-password?error=expired",
                    request.url
                )
            );
        }
    }

    return NextResponse.redirect(
        new URL("/reset-password", request.url)
    );
}