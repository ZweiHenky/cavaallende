

import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { inferAdditionalFields, phoneNumberClient } from "better-auth/client/plugins";

// eslint-disable-next-line import/no-unresolved
import { expoClient } from "@better-auth/expo/client";

export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_SOCKET_URL , // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "cavaallende",
            storagePrefix: "cavaallende",
            storage: SecureStore,
        }),
        phoneNumberClient(),
        inferAdditionalFields({
            user:{
                role:{
                    type:"string"
                }
            }
        })
    ],
    credentials: "include",
    sessionOptions:{
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    }
});