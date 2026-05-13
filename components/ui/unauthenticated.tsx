import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Unauthenticated() {

    const router = useRouter();
    return (
        <View className="flex-1 justify-center items-center w-[90%] mx-auto">
            <Text className="text-2xl text-center font-bold text-secondary">Login to access this page</Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')} className="mt-4 bg-secondary p-2 rounded-xl w-[50%] mx-auto">
                <Text className="text-xl text-center font-bold text-white">Login</Text>
            </TouchableOpacity>
        </View>
    );
}