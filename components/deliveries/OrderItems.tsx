import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { formatterDate } from "@/utils/formatterDate";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";

interface DeliveryItemProps {
    item: IPurchase;
}   

export default function DeliveryItem({ item }: DeliveryItemProps) {

    const router = useRouter();

    return (
        <TouchableOpacity className="flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md" onPress={() => router.push(`/deliveries/${item.purchase_id}`)}>
            <View className="flex flex-col gap-2">
                <Text className="text-lg">Order ID: {item.purchase_id}</Text>
                <Text className="text-lg">Total: {formatterCurrency(Number(item.total))}</Text>
            </View>
            <View className="flex flex-col items-end gap-2">
                <Text className="text-tertiary font-bold text-lg text-end">{item.status}</Text>  
                <Text className="text-gray-500 text-sm text-end">Created at: {formatterDate(item.created_at)}</Text>
            </View>
        </TouchableOpacity>
    )
}