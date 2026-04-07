import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { formatterDate } from "@/utils/formatterDate";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "../ui/icon-symbol";

interface OrderItemProps {
    item: IPurchase;
    status: string;
}   

export default function OrderItem({ item, status }: OrderItemProps) {

    const router = useRouter();

    return (
        <TouchableOpacity
            className="flex-row justify-between items-center bg-white w-[90%] mx-auto p-4 rounded-2xl shadow-sm border border-gray-100"
            onPress={() => status === "active" ? router.push(`/orders/${item.purchase_id}`) : router.push(`/orders/orderResume/${item.purchase_id}`)}
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
                {item.status}
            </Text>
            </View>

            <Text className="text-gray-300 text-lg">
                <IconSymbol name="chevron.right" size={24} color="#5a0f1b" />
            </Text>

        </View>

        </TouchableOpacity>
    )
}