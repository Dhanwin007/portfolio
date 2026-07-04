// src/stores/auth.store.ts
import { profileInitService } from "@/services/auth/initialize-profile.service";
import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

import {
    authService,
    type LoginCredentials,
    type RegisterCredentials,
} from "@/services/auth/auth.service";

import { sessionService } from "@/services/auth/session.service";

interface AuthState {
    user: User | null;
    session: Session | null;

    loading: boolean;
    error: string | null;

    login: (
        credentials: LoginCredentials
    ) => Promise<boolean>;

    register: (
        credentials: RegisterCredentials
    ) => Promise<boolean>;

    logout: () => Promise<void>;

    initializeSession: () => Promise<void>;

    clearError: () => void;
    
    forgotPassword: (
    email: string
    ) => Promise<boolean>;
    
    resetPassword: (
    password: string
    ) => Promise<boolean>;

//     exchangeRecoveryCode: (
//     code: string
// ) => Promise<boolean>;

    subscribeToAuthChanges: () => () => void;
}

export const authStore = create<AuthState>((set) => ({

    user: null,

    session: null,

    loading: false,

    error: null,

    async login(credentials) {

        set({
            loading: true,
            error: null,
        });

        const { data, error } =
            await authService.login(credentials);

        if (error) {

            set({
                loading: false,
                error: error.message,
            });

            return false;
        }

        set({
            user: data.user,
            session: data.session,
            loading: false,
            error: null,
        });

        return true;
    },

   async register(credentials) {

    set({
        loading: true,
        error: null,
    });

    const { data, error } =
        await authService.register({
            email: credentials.email,
            password: credentials.password,
           
        });
        console.log("USER:", data.user);
console.log("SESSION:", data.session);

    if (error) {

        set({
            loading: false,
            error: error.message,
        });

        return false;
    }

    if (!data.user) {

        set({
            loading: false,
            error: "Registration failed.",
        });

        return false;
    }

    const result =
        await profileInitService.initializeProfile({
            userId: data.user.id,
            username: credentials.username,
            displayName: credentials.displayName,
        });

    if (!result.success) {

        set({
            loading: false,
            error: result.error?.message ?? "Failed to initialize profile.",
        });

        return false;
    }

    set({
        user: data.user,
        session: data.session,
        loading: false,
        error: null,
    });

    return true;
},
async forgotPassword(email) {

    set({
        loading: true,
        error: null,
    });

    const { error } =
        await authService.forgotPassword(email);

    if (error) {

        set({
            loading: false,
            error: error.message,
        });

        return false;
    }

    set({
        loading: false,
        error: null,
    });

    return true;

},
// async exchangeRecoveryCode(code) {

//     const { data, error } =
//         await authService.exchangeRecoveryCode(code);

//     if (error) {

//         set({
//             error: error.message,
//         });

//         return false;
//     }

//     set({
//         session: data.session,
//         user: data.user,
//         error: null,
//     });

//     return true;
// },
async resetPassword(password) {

    set({
        loading: true,
        error: null,
    });

    const { error } =
        await authService.resetPassword(password);

    if (error) {

        set({
            loading: false,
            error: error.message,
        });

        return false;
    }

    set({
        loading: false,
        error: null,
    });

    return true;

},

    async logout() {

        await authService.logout();

        set({
            user: null,
            session: null,
            error: null,
        });

    },

    async initializeSession() {

        const { data } =
            await sessionService.getSession();

        set({
            session: data.session,
            user: data.session?.user ?? null,
        });

    },
 subscribeToAuthChanges() {

    const {
        data: { subscription },
    } = sessionService.onAuthStateChange(
        async (_event, session) => {

            set({
                session,
                user: session?.user ?? null,
            });

        }
    );

    return () => {

        subscription.unsubscribe();

    };



},

    clearError() {

        set({
            error: null,
        });

    },

}));