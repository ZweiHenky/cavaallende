import { Stack } from "expo-router";
import { useOnCreatePurchase } from "@/hooks/sockets/purchases/useOnCreatePurchase";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { OneSignal, LogLevel } from "react-native-onesignal";
import { useLocationStore } from "@/store/useLocationStore";

export default function DeliveriesLayout() {

    const { data: session, isPending } = authClient.useSession()
    const {getLocation, lastKnownLocation} = useLocationStore()

    useOnCreatePurchase();

    useEffect(() => {
        if (!lastKnownLocation) {
          getLocation()
        }
      }, [lastKnownLocation, getLocation])

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
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="detailOrder" />
        </Stack>
    );
}