"use client";

import { useEffect } from "react";

import { authStore } from "@/stores/auth.store";

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const initializeSession =
        authStore(
            (state) => state.initializeSession
        );

    const subscribeToAuthChanges =
        authStore(
            (state) => state.subscribeToAuthChanges
        );

    useEffect(() => {

        initializeSession();

        const unsubscribe =
            subscribeToAuthChanges();

        return () => {

            unsubscribe();

        };

    }, [
        initializeSession,
        subscribeToAuthChanges,
    ]);

    return children;
}