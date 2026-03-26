import React from 'react';
import { View, Text, Image } from 'react-native';
import { formatterCurrency } from "@/utils/formatterCurrency";

interface PurchaseItem {
    purchase_item_id?: number;
    product_name?: string;
    quantity: number;
    line_total: number | string;
    unit_price: number | string;
}

interface OrderItemsListProps {
    items: PurchaseItem[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
    if (!items || items.length === 0) return null;

    return (
        <View className="flex-col justify-between items-center w-full">
            <Text className="text-2xl font-bold text-tertiary mb-4" > Items</Text>
            <View className="flex-row justify-between items-center w-full mb-4 border-b border-gray-200 pb-2">
                <Text className="text-xl font-bold text-tertiary w-1/6 text-center" > Image</Text>
                <Text className="text-xl font-bold text-tertiary w-1/4 text-center" > Product</Text>
                <Text className="text-xl font-bold text-tertiary w-1/8 text-center" > Qty</Text>
                <Text className="text-xl font-bold text-tertiary w-1/4 text-center" > Total</Text>
            </View>
            {
                items.map((item, index) => (
                    <View key={item.purchase_item_id || index} className="flex-row justify-between items-center w-full mb-4">
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
    );
}
