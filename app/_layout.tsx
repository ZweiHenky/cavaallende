import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>

  );
}
