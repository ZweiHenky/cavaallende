import React from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { OrderItemsList } from "@/components/orders/OrderItemsList";
import { useGetDetailPurchase } from "@/hooks/services/purchases/useGetDetailPurchase";
import { useLocalSearchParams } from "expo-router";
import { formatterCurrency } from "@/utils/formatterCurrency";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import CreditCardIcon from "@/assets/icons/CreditCardIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import { ThemedView } from "@/components/ui/ThemedView";

export default function ResumeOrder() {
    const { idResume } = useLocalSearchParams() as { idResume: string };
    
    // Fetch the order data using the idResume
    const { data, isLoading, error } = useGetDetailPurchase(idResume);

    const handleCall = (phoneNumber: string) => {
        if (!phoneNumber) return;
        Linking.openURL(`tel:${phoneNumber}`);
    };

    if (isLoading) {
        return (
            <ThemedView className="flex-1 justify-center items-center">
                <Text className="text-xl text-primary">Cargando...</Text>
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView className="flex-1 justify-center items-center">
                <Text className="text-xl text-red-500">Error: {error.message}</Text>
            </ThemedView>
        );
    }

    const order = data?.data;

    return (
        <ThemedView className="flex-1 px-4 pt-6">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {order && (
                    <View className="flex-col gap-6 w-full mt-4">
                        {/* Status Header */}
                        <View className="w-full mb-2 flex-col items-center">
                            <Text className="text-4xl text-tertiary font-bold text-center">
                                {order.status.toUpperCase()}
                            </Text>
                            <Text className="text-sm text-gray-500 mt-2">
                                Orden #{order.purchase_id} • {new Date(order.created_at).toLocaleDateString()}
                            </Text>
                        </View>

                        {/* Customer & Payment Info */}
                        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-4">
                            <Text className="text-lg font-bold text-tertiary mb-3 border-b border-gray-100 pb-2">
                               Delivery and payment details
                            </Text>
                            
                            <View className="flex-row justify-between items-center mb-4">
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-gray-100 p-2 rounded-full">
                                        <UserIcon color="#4b5563" size={20} />
                                    </View>
                                    <Text className="text-lg text-primary">{order.delivery_name || order.user_name}</Text>
                                </View>
                                {order.delivery_phone ? (
                                    <TouchableOpacity 
                                        className="bg-primary p-2 rounded-full" 
                                        onPress={() => handleCall(order.delivery_phone)}
                                    >
                                        <PhoneIcon color="#fff" size={18} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <View className="flex-row items-center gap-3">
                                <View className="bg-gray-100 p-2 rounded-full">
                                    <CreditCardIcon color="#4b5563" size={20} />
                                </View>
                                <Text className="text-lg text-primary capitalize">
                                    {order.payment_method === "stripe" ? "Tarjeta" : "No found"}
                                </Text>
                            </View>
                        </View>

                        {/* Address Info */}
                        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <Text className="text-lg font-bold text-tertiary mb-3 border-b border-gray-100 pb-2">
                                Destination
                            </Text>
                            
                            <View className="flex-row items-start gap-3">
                                <View className="bg-gray-100 p-2 rounded-full mt-1">
                                    <LocationIcon color="#4b5563" size={20} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-base text-primary leading-6 mt-1">{order.text_address}</Text>
                                    {order.notes ? (
                                        <Text className="text-sm text-gray-500 mt-2 italic">
                                            Notes: {order.notes}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                        </View>

                        {/* Items List */}
                        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 pb-6">
                            <OrderItemsList items={order.purchase_items || []} />
                        </View>

                        {/* Summary / Totals */}
                        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
                            <Text className="text-lg font-bold text-tertiary mb-3 border-b border-gray-100 pb-2">
                                Ganancias por envio
                            </Text>
                            
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-base text-gray-400">Ganancia</Text>
                                <Text className="text-base text-primary font-medium">
                                    {formatterCurrency(Number(order.shipping_cost) * 0.80)}
                                </Text>
                            </View>

                        </View>

                    </View>
                )}
            </ScrollView>
        </ThemedView>
    );
}
