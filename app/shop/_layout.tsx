import { Stack } from 'expo-router'
import React from 'react'
import ExpoStripeProvider from '@/components/shop/stripe/StripeProvider'

export default function _layout() {
  return (
    <ExpoStripeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ExpoStripeProvider>
  )
}
