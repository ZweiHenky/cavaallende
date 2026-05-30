import { Stack } from "expo-router";
import { useOnCreatePurchase } from "@/hooks/sockets/purchases/useOnCreatePurchase";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { OneSignal } from "react-native-onesignal";
import { useRouter } from "expo-router";

export default function AdminLayout() {

    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useOnCreatePurchase();

    useEffect(() => {
        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/(tabs)");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (session && !isPending) {
            OneSignal.login(session.user.id);
            OneSignal.User.addTag("role", "admin");
        }
    }, [session]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="detailOrder" />
        </Stack>
    );
}
