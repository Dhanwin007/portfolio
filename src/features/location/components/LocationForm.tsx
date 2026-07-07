"use client";

import { useEffect } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    locationSchema,
    type LocationFormValues,
} from "../validations/location.schema";

import { locationStore } from "@/stores/location.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationForm() {

    const location =
        locationStore(
            (state) => state.location
        );

    const loading =
        locationStore(
            (state) => state.loading
        );

    const error =
        locationStore(
            (state) => state.error
        );

    const fetchLocation =
        locationStore(
            (state) => state.fetchLocation
        );

    const updateLocation =
        locationStore(
            (state) => state.updateLocation
        );

    const clearError =
        locationStore(
            (state) => state.clearError
        );

    const {

        register,

        handleSubmit,

        reset,

    } = useForm<LocationFormValues>({

        resolver:
            zodResolver(
                locationSchema
            ),

        defaultValues: {

            country: "",

            state: "",

            city: "",

        },

    });

    useEffect(() => {

        fetchLocation();

    }, [fetchLocation]);

    useEffect(() => {

        if (!location) return;

        reset({

            country:
                location.country ?? "",

            state:
                location.state ?? "",

            city:
                location.city ?? "",

        });

    }, [location, reset]);

    const onSubmit:
        SubmitHandler<
            LocationFormValues
        > = async (data) => {

        clearError();

        const success =
            await updateLocation(
                data
            );

        if (success) {

            toast.success(
                "Location updated successfully."
            );

        }

    };

    return (

        <form

            onSubmit={
                handleSubmit(
                    onSubmit
                )
            }

            className="
                space-y-6

                rounded-3xl

                border

                border-white/10

                bg-white/5

                p-8
            "

        >

            <div className="space-y-2 text-white">

                <Label>

                    Country

                </Label>

                <Input

                    placeholder="Country"

                    {...register(
                        "country"
                    )}

                />

            </div>

            <div className="space-y-2 text-white">

                <Label>

                    State

                </Label>

                <Input

                    placeholder="State"

                    {...register(
                        "state"
                    )}

                />

            </div>

            <div className="space-y-2 text-white">

                <Label>

                    City

                </Label>

                <Input

                    placeholder="City"

                    {...register(
                        "city"
                    )}

                />

            </div>

            {error && (

                <p className="text-red-400">

                    {error}

                </p>

            )}

            <Button

                type="submit"

                disabled={loading}

                className="w-full"

            >

                {

                    loading

                        ? "Saving..."

                        : "Save Changes"

                }

            </Button>

        </form>

    );

}