import { ThemedView } from '@/components/ui/ThemedView';
import { authClient } from '@/lib/auth-client';
import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import Loading from '@/components/ui/Loading';

export default function Layout() {

  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();

  useEffect(() => {
    if (session && !isPending) {
      if (session.user.role === 'user') {
        router.replace('/(tabs)')
      }else if (session.user.role === 'delivery') {
        router.replace('/deliveries/(tabs)/orders')
      }
    } 
  }, [session,isPending, router])
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
    </Stack>
  ) 
}
