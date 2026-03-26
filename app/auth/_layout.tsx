import { authClient } from '@/lib/auth-client';
import {router, Stack } from 'expo-router'
import React from 'react'

export default function Layout() {

  const { data: session } = authClient.useSession.get();

  if(session){
    router.replace("/")
  }

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
