

import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { adminClient, phoneNumberClient } from "better-auth/client/plugins";

// eslint-disable-next-line import/no-unresolved
import { expoClient } from "@better-auth/expo/client";
import { ac, admin, delivery, user } from "./permissions";


export const authClient = createAuthClient({
    baseURL: "https://smooth-muskox-luckily.ngrok-free.app", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "cavaallende",
            storagePrefix: "cavaallende",
            storage: SecureStore,
        }),
        phoneNumberClient(),
        adminClient({
            ac,
            roles:{
                admin,
                delivery,
                user,
            }
        }),
    ],
    credentials: "include",
    sessionOptions:{
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    }
});