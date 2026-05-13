import { authClient } from '@/lib/auth-client';
import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

export default function Layout() {

  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();

  useEffect(() => {

    if (session && !isPending) {

      if(session.user.role === null){
        authClient.updateUser({
          role: "user"
        })
         router.replace('/(tabs)')
         return;
      }

      if (session.user.role === 'user') {
        if (!session.user.phoneNumber) {
          router.replace('/config/newPhone')
          return;
        }else{
          router.replace('/(tabs)')
          return;
        }

      }else if (session.user.role === 'delivery') {
        router.replace('/deliveries/(tabs)/orders')
        return;
      }else if (session.user.role === 'admin') {
        router.replace('/admin/(tabs)/orders')
        return;
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
