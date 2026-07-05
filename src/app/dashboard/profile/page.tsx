"use client";

import { useEffect } from "react";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { ProfileForm } from "@/features/profile/components/ProfileForm";

import { profileStore } from "@/stores/profile.store";

export default function ProfilePage() {

    const fetchProfile =
        profileStore(
            (state) => state.fetchProfile
        );

    const loading =
        profileStore(
            (state) => state.loading
        );

    const error =
        profileStore(
            (state) => state.error
        );

    useEffect(() => {

        fetchProfile();

    }, [fetchProfile]);

    return (

        <DashboardPage

            title="Profile"

            description="Manage your personal information."

        >

            {loading ? (

                <p className="text-zinc-400">

                    Loading profile...

                </p>

            ) : error ? (

                <p className="text-red-400">

                    {error}

                </p>

            ) : (

                <ProfileForm />

            )}

        </DashboardPage>

    );

}