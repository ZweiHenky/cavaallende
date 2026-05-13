import { View, TouchableOpacity, Text, Image, Alert } from "react-native";
import { authClient } from "@/lib/auth-client";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ui/ThemedView";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import AppleIcon from "@/assets/icons/AppleIcon";
import HeaderBack from "@/components/ui/HeaderBack";
import { useRouter } from "expo-router";

export default function Login() {

    const router = useRouter();

    const handleSocialLogin = async (provider: "google" | "apple") => {

        const {error} = await authClient.signIn.social({
            provider,
            callbackURL: "/auth",
        })

        if(error){
            Alert.alert("Error", error.message)
        }

    }


    return (
        <ThemedView>

            <HeaderBack title="Login" />

            <View className="flex-1 items-center justify-center w-full px-10 gap-6">
                <Image source={require("@/assets/images/logo.png")} className=" h-32 mb-4" resizeMode="contain" />
                <Text className="text-2xl text-textColor font-bold mb-4">Iniciar Sesión</Text>
                <View className="w-full flex-row gap-2 items-center justify-between">
                    <TouchableOpacity onPress={() => handleSocialLogin("google")} className=" items-center bg-tertiary justify-center w-1/2 h-12 border border-gray-300 rounded-lg px-2 mb-2">
                        <GoogleIcon size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSocialLogin("apple")} className="items-center bg-tertiary justify-center w-1/2 h-12 border border-gray-300 rounded-lg px-2 mb-2">
                        <AppleIcon size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Link href="/auth/register" className="text-center text-textColor">¿No tienes cuenta? Registrate</Link>
            </View>
        </ThemedView>

    );
}