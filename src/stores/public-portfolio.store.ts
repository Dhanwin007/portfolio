// src/stores/public-portfolio.store.ts

import { create } from "zustand";

import { publicPortfolioService } from "@/services/public-portfolio/public-portfolio.service";

import type { PublicPortfolio } from "@/features/public-portfolio/types";

interface PublicPortfolioState {

    portfolio: PublicPortfolio | null;

    loading: boolean;

    error: string | null;

    fetchPublicPortfolio: (
        username: string
    ) => Promise<void>;

    clearPublicPortfolio: () => void;

}

export const usePublicPortfolioStore =
    create<PublicPortfolioState>((set) => ({

        portfolio: null,

        loading: false,

        error: null,

        fetchPublicPortfolio: async (
            username: string
        ) => {

            set({

                loading: true,

                error: null,

            });

            const result =
                await publicPortfolioService
                    .getPublicPortfolio(
                        username
                    );

            if (result.error) {

                set({

                    portfolio: null,

                    loading: false,

                    error:
                        result.error.message,

                });

                return;

            }

            set({

                portfolio:
                    result.data,

                loading: false,

                error: null,

            });

        },

        clearPublicPortfolio: () =>

            set({

                portfolio: null,

                loading: false,

                error: null,

            }),

    }));