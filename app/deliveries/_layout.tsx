import { Stack } from "expo-router";
import { useOnCreatePurchase } from "@/hooks/sockets/purchases/useOnCreatePurchase";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { OneSignal, LogLevel } from "react-native-onesignal";
import { useLocationStore } from "@/store/useLocationStore";

export default function DeliveriesLayout() {

  const { data: session, isPending } = authClient.useSession()
  const { getLocation, lastKnownLocation } = useLocationStore()

  useOnCreatePurchase();

  useEffect(() => {
    if (!lastKnownLocation) {
      getLocation()
    }
  }, [lastKnownLocation, getLocation])

  useEffect(() => {
    if (session && !isPending) {


      OneSignal.login(session.user.id);

      OneSignal.User.addTag("role", "delivery");

    }
  }, [session])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="detailOrder" />
      <Stack.Screen name="orderResume" />
    </Stack>
  );
}