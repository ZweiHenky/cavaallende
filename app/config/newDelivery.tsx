import HeaderBack from "@/components/ui/HeaderBack";
import { ThemedView } from "@/components/ui/ThemedView";
import { createConnectAccount } from "@/core/actions/general/stripe.action";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function NewDelivery() {

    const {data:session } = authClient.useSession()
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleCreateAccount = async () => {

        Alert.alert("¿Estás seguro de crear una cuenta de repartidor?", "No podrás cambiar de cuenta de repartidor después de crearla", [
            {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Crear cuenta",
                onPress: async () => {
                    setLoading(true)
                    const account = await createConnectAccount({
                        email: session?.user?.email!,
                        name: session?.user?.name!,
                        userId: session?.user?.id!
                    })

                    if(!account.accountId){
                        Alert.alert("Error", account.message!)
                        setLoading(false)
                        return
                    }

                    setLoading(false)

                    router.replace("/deliveries/config/accountStripe")
                }
            }
        ])
    }

    if(loading){
        return (
            <ThemedView>
                <HeaderBack title="Repartidor" />
                <View className="flex-1 items-center justify-center">
                    <Text>Cargando...</Text>
                </View>
            </ThemedView>
        )
    }


    return (
        <ThemedView>
            <HeaderBack title="Repartidor" />

            <View className="flex-1 items-center justify-center px-4 gap-4">
                <Text className="text-2xl font-bold">¿Quieres ser repartidor?</Text>
                <Text className="text-lg text-center">Gana dinero entregando vinos a nuestros clientes </Text>
                <Text className="text-center text-sm text-gray-500">¡Importante! Al continuar, aceptas los términos y condiciones de Stripe</Text>
                <TouchableOpacity className="bg-primary rounded-2xl p-4 mt-4 w-2/3" onPress={handleCreateAccount}>
                    <Text className="text-white font-bold text-center">Crear cuenta</Text>
                </TouchableOpacity>
            </View>
            
        </ThemedView>
    );
}