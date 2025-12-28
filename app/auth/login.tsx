import { useState } from "react"; 
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { authClient } from "@/lib/auth-client";
import { Link, router } from "expo-router";
import { ThemedView } from "@/components/ui/ThemedView";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import AppleIcon from "@/assets/icons/AppleIcon";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await authClient.signIn.email({
            email,
            password,
        })
        
        if(!res.error){
            router.replace("/")
        }
    };

    return (
        <ThemedView>
            <View className="flex-1 items-center justify-center w-full px-10 gap-6">
                <Image source={require("@/assets/images/logo.png")} className=" h-32 mb-4" resizeMode="contain" />
                <Text className="text-2xl text-textColor font-bold mb-4">Iniciar Sesión</Text>
                <View className="w-full flex-row gap-2 items-center justify-between">
                    <TouchableOpacity className=" items-center bg-tertiary justify-center w-1/2 h-12 border border-gray-300 rounded-lg px-2 mb-2">
                        <GoogleIcon size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center bg-tertiary justify-center w-1/2 h-12 border border-gray-300 rounded-lg px-2 mb-2">
                        <AppleIcon size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full h-12 border border-secondary rounded-lg px-4 "
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    className="w-full h-12 border border-secondary rounded-lg px-4 "
                />
                <TouchableOpacity onPress={handleLogin} className="w-full h-12 items-center justify-center bg-tertiary border border-gray-300 rounded-lg px-2 mb-2">
                    <Text className="text-white text-center">Login</Text>
                </TouchableOpacity>
                <Link href="/auth/register" className="text-center text-textColor">¿No tienes cuenta? Registrate</Link>
            </View>
        </ThemedView>

    );
}