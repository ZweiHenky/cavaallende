import { Stack } from "expo-router";
import { useOnCreatePurchase } from "@/hooks/sockets/purchases/useOnCreatePurchase";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { OneSignal, LogLevel } from "react-native-onesignal";

export default function DeliveriesLayout() {

    const { data: session, isPending } = authClient.useSession()

    useOnCreatePurchase();

    useEffect(() => {
        if (session && !isPending) {
          // Enable verbose logging for debugging (remove in production)
          OneSignal.Debug.setLogLevel(LogLevel.Verbose);
          // Initialize with your OneSignal App ID
          OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_ID!);
    
          OneSignal.login(session.user.id);

          OneSignal.User.addTag("role", "delivery");
          // Use this method to prompt for push notifications.
          // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
          OneSignal.Notifications.requestPermission(false);
        }
      }, [session])

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="detailOrder" options={{ headerShown: false }} />
        </Stack>
    );
}