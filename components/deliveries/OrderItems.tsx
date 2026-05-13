import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { formatterDate } from "@/utils/formatterDate";
import { TouchableOpacity, View, Text, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { usePatchAssignDelivery } from "@/hooks/services/purchases/mutations/usePatchAssignDelivery";
import { authClient } from "@/lib/auth-client";
import { IconSymbol } from "../ui/icon-symbol";

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
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3 w-[90%] mx-auto">

            <TouchableOpacity
                className="flex-row justify-between items-center"
                onPress={() => router.push(`/deliveries/detailOrder/${item.purchase_id}`)}
            >

                {/* Left side */}
                <View className="flex-col gap-1">
                <Text className="text-sm text-gray-400">
                    Order #{item.purchase_id}
                </Text>

                <Text className="text-lg font-bold text-gray-800">
                    {formatterCurrency(Number(item.total))}
                </Text>

                <Text className="text-xs text-gray-400">
                    {formatterDate(item.created_at)}
                </Text>
                </View>

                {/* Right side */}
                <View className="items-end gap-2">

                <View className=" px-3 py-1 rounded-full">
                    <Text className="text-lg font-semibold text-[#5a0f1b] capitalize">
                    {item.status === 'accepted' ? 'Nuevo' : item.status}
                    </Text>
                </View>

                <Text className="text-gray-300 text-lg">
                    <IconSymbol name="chevron.right" size={24} color="#5a0f1b" />
                </Text>

                </View>

            </TouchableOpacity>

            {item.status === "paid" && (
                <TouchableOpacity
                disabled={isPending}
                className="bg-[#c9a24d] rounded-xl py-3 mt-4"
                onPress={handleAcceptOrder}
                activeOpacity={0.8}
                >
                {isPending ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <Text className="text-white text-center font-semibold">
                    Accept Order
                    </Text>
                )}
                </TouchableOpacity>
            )}

        </View>
    )
}