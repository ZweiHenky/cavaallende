import { Image, ScrollView, Text, View } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import { useGetDetailPurchase } from "@/hooks/services/purchases/useGetDetailPurchase";
import { useLocalSearchParams } from "expo-router";
import { formatterDate } from "@/utils/formatterDate";
import { formatterCurrency } from "@/utils/formatterCurrency";


export default function DetailOrder() {
    const { id } = useLocalSearchParams() as { id: string };
    const { data, isLoading, error } = useGetDetailPurchase(id);

    return (
        <ThemedView>
            
            <View className="relative h-80 w-full bg-primary mt-10 mb-2">
                <Text>Order Detail</Text>
            </View>
            
            <ScrollView 
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 16,
                    backgroundColor: "white",
                    borderRadius: 8,

                }}
            >
                <View className="flex-row justify-between items-center w-full mb-4">
                    <Text className="text-xl  text-primary" > Order ID: {data?.data?.purchase_id}</Text>
                    <Text className="text-xl  text-tertiary font-bold " >{data?.data?.status.toUpperCase()}</Text>
                </View>
                <View className="flex-col justify-between gap-2 w-full mb-4">
                    <View className="flex-row justify-between items-center w-full">
                        <Text className="text-xl  text-primary" > Date: </Text>
                        {/* <Text className="text-xl text-primary" >{formatterDate (data?.data?.created_at!)}</Text> */}
                    </View>
                    <View className="flex-row justify-between items-center w-full">
                        <Text className="text-xl text-primary" > Method: </Text>
                        <Text className="text-xl text-primary" >{data?.data?.payment_method}</Text>
                    </View>
                </View>
                <View className="flex-col justify-between items-center w-full">
                    <Text className="text-2xl font-bold text-tertiary mb-4" > Items</Text>
                    <View className="flex-row justify-between items-center w-full mb-4 border-b border-gray-200 pb-2">
                        <Text className="text-xl font-bold text-tertiary w-1/6 text-center" > Image</Text>
                        <Text className="text-xl font-bold text-tertiary w-1/4 text-center" > Product</Text>
                        <Text className="text-xl font-bold text-tertiary w-1/8 text-center" > Qty</Text>
                        <Text className="text-xl font-bold text-tertiary w-1/4 text-center" > Total</Text>
                    </View>
                    {
                        data?.data?.purchase_items?.map((item) => (
                            <View key={item.purchase_item_id} className="flex-row justify-between items-center w-full mb-4">
                                <Image source={require("@/assets/images/vino.png")} className="w-20 h-20 " />
                                <Text 
                                numberOfLines={2} 
                                ellipsizeMode="tail" 
                                className="text-xl  text-primary w-1/4 " > {item.product_name}</Text>
                                <Text className="text-xl  text-primary w-1/8 text-center" > {item.quantity}</Text>
                                <View className="flex-col justify-between items-center w-1/4 text-center ">
                                    <Text className="text-xl font-bold text-primary" >{formatterCurrency(Number(item.line_total))}</Text>
                                    <Text className="text-sm font-bold text-gray-500" >{formatterCurrency(Number(item.unit_price))}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View className="flex-col justify-between items-end w-full mt-4">
                    <View className="flex-row justify-between items-center w-full">
                        <Text className="text-xl text-primary" > Subtotal: </Text>
                        <Text className="text-xl text-primary" >{formatterCurrency(Number(data?.data?.subtotal))}</Text>
                    </View>
                    <View className="flex-row justify-between items-center w-full">
                        <Text className="text-xl  text-primary" > Discount: </Text>
                        <Text className="text-xl text-primary" >{formatterCurrency(Number(data?.data?.discount))}</Text>
                    </View>
                    <View className="flex-row justify-between items-center w-full">
                        <Text className="text-xl font-bold text-primary" > Total: </Text>
                        <Text className="text-xl text-primary border-t border-gray-200 pt-2 font-bold" >{formatterCurrency(Number(data?.data?.total))}</Text>
                    </View>
                </View>
            </ScrollView>

        </ThemedView>
    )
}