import PhoneVerifyProvider from "@/providers/PhoneVerifyProvider";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <PhoneVerifyProvider>
            <Stack
                screenOptions={{    
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="phone" />
                <Stack.Screen name="newPhone" />
                <Stack.Screen name="verify-phone" />
            </Stack>
        </PhoneVerifyProvider>
    )
}