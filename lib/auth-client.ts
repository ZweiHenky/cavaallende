import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://192.168.0.238:3000/api/auth/", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "cavaAllende",
            storagePrefix: "cavaAllende",
            storage: SecureStore,
        })
    ],
    credentials: "include"
});