import { Stack } from "expo-router";
import { useOnCreatePurchase } from "@/hooks/sockets/purchases/useOnCreatePurchase";

export default function DeliveriesLayout() {

    useOnCreatePurchase();

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="detailOrder" options={{ headerShown: false }} />
        </Stack>
    );
}