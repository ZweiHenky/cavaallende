
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/client";
import * as SecureStore from "expo-secure-store";
import { phoneNumberClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
    baseURL: "https://smooth-muskox-luckily.ngrok-free.app", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "cavaallende",
            storagePrefix: "cavaallende",
            storage: SecureStore,
        }),
        phoneNumberClient()
    ],
    credentials: "include"
});