"use client";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

import { LocationForm } from "@/features/location/components/LocationForm";

export default function LocationPage() {

    return (

        <DashboardPage

            title="Location"

            description="Manage your location information."

        >

            <LocationForm />

        </DashboardPage>

    );

}