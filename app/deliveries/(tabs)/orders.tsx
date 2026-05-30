import DeliveryItem from '@/components/deliveries/OrderItems';
import Error from '@/components/ui/Error';
import Loading from '@/components/ui/Loading';
import { ThemedView } from '@/components/ui/ThemedView'
import { useGetPurchasesToday } from '@/hooks/services/purchases/useGetPutchasesToday';
import { useGetActivePurchaseByDelivery } from '@/hooks/services/purchases/useGetActivePurchaseByDelivery';
import { useGetPurchaseHistoryByUser } from '@/hooks/services/purchases/useGetPurchaseHistoryByUser';
import { authClient } from '@/lib/auth-client';
import { IPurchase } from '@/infrastructure/interfaces/purchase.interface';
import React, { useState } from 'react'
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router';
import { useGetHistoryByDelivery } from '@/hooks/services/purchases/useGetHistoryByDelivery';
import OrderItemHistory from '@/components/deliveries/OrdenItemHistory';
import { usePullToRefresh } from '@/hooks/refresh/usePullToRefresh';

const tabs = [
    { key: "nuevos", label: "Nuevos" },
    { key: "history", label: "Historial" }
];

export default function Orders() {

    const { data: session } = authClient.useSession();
    const router = useRouter();

    const [active, setActive] = useState<string>("nuevos");

    const { data: nuevosData, isLoading: isLoadingNuevos, error: errorNuevos, refetch: refetchNuevos } = useGetPurchasesToday("accepted");
    const { data: historyData, isLoading: isLoadingHistory, error: errorHistory, refetch: refetchHistory } = useGetHistoryByDelivery(session?.user?.id as string);
    const { data: activePurchaseData } = useGetActivePurchaseByDelivery(session?.user?.id as string);

    const isLoading = active === "nuevos" ? isLoadingNuevos : isLoadingHistory;
    const error = active === "nuevos" ? errorNuevos : errorHistory;
    const currentData = active === "nuevos" ? nuevosData?.data : historyData?.data;

    const currentRefetch = active === "nuevos" ? refetchNuevos : refetchHistory;

    const { loadingRefresh, pullToRefresh } = usePullToRefresh(currentRefetch);

    if (isLoadingNuevos && isLoadingHistory) {
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

            {activePurchaseData?.data && (
                <TouchableOpacity
                    className="bg-[#c9a24d] p-4 rounded-xl mb-4 w-[90%] mx-auto items-center"
                    onPress={() => router.push(`/deliveries/detailOrder/${activePurchaseData.data.purchase_id}`)}
                >
                    <Text className="text-white font-bold text-lg">Pedido Activo</Text>
                </TouchableOpacity>
            )}

            <View className="flex-row p-1 rounded-2xl mb-4 w-[90%] mx-auto">
                {tabs.map(tab => {
                    const isActive = active === tab.key;

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => handleChangeStatus(tab.key)}
                            disabled={isActive}
                            className={`flex-1 items-center py-2 rounded-xl ${isActive ? "bg-[#5a0f1b]" : ""
                                }`}
                        >
                            <Text
                                className={`text-xl font-bold ${isActive ? "text-white" : "text-gray-500"
                                    }`}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View className="flex flex-row justify-around items-center mb-4">
                {isLoading && <Loading />}
                {error && <Error message={error.message} />}
                {
                    currentData && currentData.length > 0 ? (
                        <FlatList<IPurchase>
                            refreshControl={
                                <RefreshControl
                                    refreshing={loadingRefresh}
                                    onRefresh={pullToRefresh}
                                />
                            }
                            data={currentData}
                            renderItem={({ item }) => (
                                active === "nuevos" ? (
                                    <DeliveryItem item={item} active={activePurchaseData?.data} />
                                ) : (
                                    <OrderItemHistory item={item} />
                                )
                            )}
                            keyExtractor={({ purchase_id }) => purchase_id.toString()}
                            ItemSeparatorComponent={() => <View className="h-4" />}
                            contentContainerStyle={{ paddingBottom: 80 }}
                        />
                    ) : (
                        <Text className="text-center text-lg"> No hay pedidos en este momento </Text>
                    )
                }
            </View>
        </ThemedView>
    )
}
