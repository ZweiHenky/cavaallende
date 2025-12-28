import { ThemedView } from '@/components/ui/ThemedView'
import React from 'react'
import { Button } from 'react-native'
import { authClient } from '@/lib/auth-client'
import { Redirect, router } from 'expo-router'

export default function config (){
    
    const logOut = async () => {
        await authClient.signOut();
    }
  return (
    <ThemedView>
        <Button title="Logout" onPress={logOut}/>
    </ThemedView>
  )
}
