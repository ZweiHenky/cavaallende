import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "https://smooth-muskox-luckily.ngrok-free.app", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "cavaallende",
            storagePrefix: "cavaallende",
            storage: SecureStore,
        })
    ],
    credentials: "include"
});