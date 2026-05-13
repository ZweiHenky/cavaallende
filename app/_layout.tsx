import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import '../global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PermissionCheckedProvider from '@/providers/PermissionCheckedProvider';
import { SocketProvider } from '@/providers/SocketProvider';
import { useEffect } from 'react';
import { usePermissionsStore } from '@/store/usePermissionStore';
import { PermissionStatus } from '@/infrastructure/interfaces/location.interface';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { Fraunces_600SemiBold, useFonts } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

export default function RootLayout() {

  const queryClient = new QueryClient()
  const {requestLocationPermission, locationStatus} = usePermissionsStore()

  const [fontsLoaded, fontError] = useFonts({
    Fraunces_600SemiBold,
    Inter_400Regular,
    Inter_500Medium
  });

  SplashScreen.preventAutoHideAsync();
  
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (locationStatus !== PermissionStatus.GRANTED) {
      requestLocationPermission()
    }
  }, [requestLocationPermission, locationStatus])

  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // Replace with your OneSignal App ID from Dashboard > Settings > Keys & IDs
    OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_ID!);

    // Prompt for push permission on first launch.
    // In production, consider using an in-app message instead for better opt-in rates.
    OneSignal.Notifications.requestPermission(false);

  }, []);
  
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
      <QueryClientProvider client={queryClient}>
          <PermissionCheckedProvider>
            <SocketProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen name="deliveries" options={{ headerShown: false }} />
                <Stack.Screen name="admin" options={{ headerShown: false }} />
              </Stack>
            </SocketProvider>
          </PermissionCheckedProvider>
      </QueryClientProvider>

  );
}
