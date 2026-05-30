import { Stack } from "expo-router";

export default function OrderResumeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="[idResume]" />
        </Stack>
    );
}