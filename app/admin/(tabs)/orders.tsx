import AdminOrderItem from '@/components/admin/AdminOrderItem';
import Error from '@/components/ui/Error';
import Loading from '@/components/ui/Loading';
import { ThemedView } from '@/components/ui/ThemedView';
import { usePullToRefresh } from '@/hooks/refresh/usePullToRefresh';
import { useGetPurchasesToday } from '@/hooks/services/purchases/useGetPutchasesToday';
import { IPurchase } from '@/infrastructure/interfaces/purchase.interface';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';

const tabs = [
  { key: 'incoming', label: 'Entrantes' },
  { key: 'history', label: 'Historial' },
];

export default function AdminOrders() {

  const [active, setActive] = useState<string>('incoming');


  // Incoming = paid (waiting to be accepted)
  // History  = accepted, on_the_way, completed
  const { data, isLoading, error, refetch } = useGetPurchasesToday(
    active === 'incoming' ? 'paid' : 'accepted,on_the_way,completed'
  );

  const { loadingRefresh, pullToRefresh } = usePullToRefresh(refetch)

  const handleChangeStatus = (status: string) => {
    if (status === active) return;
    setActive(status);
  };

  if (isLoading) {
    return (
      <ThemedView>
        <Loading />
      </ThemedView>
    );
  }

  return (
    <ThemedView>

      {/* Tab switcher */}
      <View className="flex-row p-1 rounded-2xl mb-4 w-[90%] mx-auto">
        {tabs.map(tab => {
          const isActive = active === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleChangeStatus(tab.key)}
              disabled={isActive}
              className={`flex-1 items-center py-2 rounded-xl ${isActive ? 'bg-[#5a0f1b]' : ''
                }`}
            >
              <Text
                className={`text-xl font-bold ${isActive ? 'text-white' : 'text-gray-500'
                  }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex flex-row justify-around items-center mb-4">
        {error && <Error message={error.message} />}
        {data?.data && data.data.length > 0 ? (
          <FlatList<IPurchase>
            refreshControl={
              <RefreshControl
                refreshing={loadingRefresh}
                onRefresh={pullToRefresh}
              />
            }
            data={data?.data}
            renderItem={({ item }) => <AdminOrderItem item={item} />}
            keyExtractor={({ purchase_id }) => purchase_id.toString()}
            ItemSeparatorComponent={() => <View className="h-4" />}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        ) : (
          <Text className="text-center text-lg">
            {active === 'incoming'
              ? 'No hay pedidos entrantes en este momento'
              : 'No hay pedidos en el historial'}
          </Text>
        )}
      </View>

    </ThemedView>
  );
}
