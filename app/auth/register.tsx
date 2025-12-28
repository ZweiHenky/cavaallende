import { ThemedView } from '@/components/ui/ThemedView'
import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { authClient } from '@/lib/auth-client'

function AppleSignIn() {
    const handleLogin = async () => {
        await authClient.signIn.social({
            provider: "apple",
            callbackURL: "/dashboard" // this will be converted to a deep link (eg. `myapp://dashboard`) on native
        })
    };
    return <Button title="Login with Apple" onPress={handleLogin} />;
}

function GoogleSignIn() {
    const handleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/" // this will be converted to a deep link (eg. `myapp://dashboard`) on native
        })
    };
    return <Button title="Login with Google" onPress={handleLogin} />;
}

export default function Register() {

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = async () => {
      const res = await authClient.signUp.email({
              email,
              password,
              name
      })
      console.log(res)
  };

  return (
    <ThemedView>
       <GoogleSignIn />
       <AppleSignIn />
      <View>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Register" onPress={handleLogin} />
        </View>
    </ThemedView>
  )
}
