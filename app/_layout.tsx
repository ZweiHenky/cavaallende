import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PermissionCheckedProvider from '@/providers/PermissionCheckedProvider';
import { useLocation } from '@/hooks/location/useLocation';
import { SocketProvider } from '@/providers/SocketProvider';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  const queryClient = new QueryClient()

  useLocation()

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
              </Stack>
            </SocketProvider>
          </PermissionCheckedProvider>
      </QueryClientProvider>

  );
}
