import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { formatterDate } from "@/utils/formatterDate";
import { TouchableOpacity, View, Text, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { usePatchAssignDelivery } from "@/hooks/services/purchases/mutations/usePatchAssignDelivery";
import { authClient } from "@/lib/auth-client";

interface DeliveryItemProps {
    item: IPurchase;
}   

export default function DeliveryItem({ item }: DeliveryItemProps) {

    const router = useRouter();
    const { mutate: assignDelivery, isPending } = usePatchAssignDelivery();
    const { data: session } = authClient.useSession();

    const handleAcceptOrder = () => {

    if (!session?.user.id) return;

    assignDelivery(
        {
        id: item.purchase_id,
        delivery_id: session.user.id
        },
        {
        onSuccess: () => {
            router.push(`/deliveries/detailOrder/${item.purchase_id}`);
        },
        onError: () => {
            Alert.alert("Error", "Error al aceptar el pedido");
        }
        }
    );
    };

    return (
        <View className="flex flex-col gap-2 mb-2 bg-white p-4 rounded-lg shadow-md">
            <TouchableOpacity className="flex flex-row justify-between items-center" onPress={() => router.push(`/deliveries/detailOrder/${item.purchase_id}`)}>
                <View className="flex flex-col gap-2">
                    <Text className="text-lg">Order ID: {item.purchase_id}</Text>
                    <Text className="text-lg">Total: {formatterCurrency(Number(item.total))}</Text>
                </View>
                <View className="flex flex-col items-end gap-2">
                    <Text className="text-tertiary font-bold text-lg text-end">{item.status}</Text>  
                    <Text className="text-gray-500 text-sm text-end">Created at: {formatterDate(item.created_at)}</Text>
                </View>
            </TouchableOpacity>
            {item.status === "paid" && (
                <TouchableOpacity disabled={isPending} className="bg-tertiary rounded-lg p-2 w-full mt-4" onPress={handleAcceptOrder}>
                    {isPending ? (
                        <ActivityIndicator color="white" size="small" />
                    ) : (
                        <Text className="text-white text-center">Accept</Text>
                    )}
                </TouchableOpacity>
            )}
        </View>
    )
}