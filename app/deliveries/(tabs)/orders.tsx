import DeliveryItem from '@/components/deliveries/OrderItems';
import Error from '@/components/ui/Error';
import Loading from '@/components/ui/Loading';
import { ThemedView } from '@/components/ui/ThemedView'
import { useGetPurchasesToday } from '@/hooks/services/purchases/useGetPutchasesToday';
import { IPurchase } from '@/infrastructure/interfaces/purchase.interface';
import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

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

            <View className="flex flex-row justify-around items-center mb-4">
                <TouchableOpacity 
                    disabled={active === "active"} 
                    className={
                        active === "active" 
                        ? "bg-[#5a0f1b] p-2 rounded-xl w-1/2 flex items-center" 
                        : "w-1/2 flex items-center"} 
                    onPress={() => handleChangeStatus("active")}>
                    <Text 
                        className={
                            active === "active" 
                            ? "text-2xl font-bold text-white" 
                            : "text-2xl font-bold text-gray-500"} >
                            All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={active === "history"} 
                    className={
                        active === "history" 
                        ? "bg-[#5a0f1b] p-2 rounded-xl w-1/2 flex items-center" 
                        : "w-1/2 flex items-center"} 
                    onPress={() => handleChangeStatus("history")}>
                    <Text 
                        className={
                            active === "history" 
                            ? "text-2xl font-bold text-white" 
                            : "text-2xl font-bold text-gray-500"} >
                            In process
                    </Text>
                </TouchableOpacity>
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
                      />
                  ) : (
                      <Text className="text-center text-lg"> There are no orders in this moment </Text>
                  )
              }
                    </View>
        </ThemedView>
  )
}
