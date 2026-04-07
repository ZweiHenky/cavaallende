import DeliveryItem from '@/components/deliveries/OrderItems';
import Error from '@/components/ui/Error';
import Loading from '@/components/ui/Loading';
import { ThemedView } from '@/components/ui/ThemedView'
import { useGetPurchasesToday } from '@/hooks/services/purchases/useGetPutchasesToday';
import { IPurchase } from '@/infrastructure/interfaces/purchase.interface';
import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const tabs = [
  { key: "active", label: "Active" },
  { key: "history", label: "History" }
];

export default function Orders() {

  const [active, setActive] = useState<string>("active");
  
    const { data, isLoading, error } = useGetPurchasesToday(
        active === "active" ? "paid" : "accepted,on_the_way"
    );

    if (isLoading) {
        return <ThemedView>
            <Loading />
        </ThemedView>;
    }

  const handleChangeStatus = (status: string) => {
        if (status === active) return;
        setActive(status);
    }

  return (
    <ThemedView>

        <View className="flex-row p-1 rounded-2xl mb-4 w-[90%] mx-auto">
            {tabs.map(tab => {
                const isActive = active === tab.key;

                return (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => handleChangeStatus(tab.key)}
                        disabled={isActive}
                        className={`flex-1 items-center py-2 rounded-xl ${
                            isActive ? "bg-[#5a0f1b]" : ""
                        }`}
                    >
                        <Text
                            className={`text-xl font-bold ${
                                isActive ? "text-white" : "text-gray-500"
                            }`}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>

        <View  className="flex flex-row justify-around items-center mb-4">
            {isLoading && <Loading />}
            {error && <Error message={error.message} />}
            {
                data?.data && data.data.length > 0 ? (
                    <FlatList<IPurchase>
                        data={data?.data}
                        renderItem={({ item }) => (
                            <DeliveryItem item={item} />
                        )} 
                        keyExtractor={({purchase_id}) => purchase_id.toString()}   
                        ItemSeparatorComponent={() => <View className="h-4" />}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />
                ) : (
                    <Text className="text-center text-lg"> There are no orders in this moment </Text>
                )
            }
        </View>
        </ThemedView>
  )
}
