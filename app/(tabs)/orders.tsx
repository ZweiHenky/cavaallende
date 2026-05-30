import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { useGetPurchasesByStatus } from "@/hooks/services/purchases/useGetPurchasesByStatus";
import { ThemedView } from "@/components/ui/ThemedView";
import { authClient } from "@/lib/auth-client";
import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";
import { useState } from "react";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import OrderItem from "@/components/orders/OrderItem";
import Unauthenticated from "@/components/ui/unauthenticated";
import { usePullToRefresh } from "@/hooks/refresh/usePullToRefresh";

const tabs = [
  { key: "active", label: "Active" },
  { key: "history", label: "History" }
];

export default function Orders() {

  const { data: session, isPending: isLoadingSession } = authClient.useSession();
  const [active, setActive] = useState<string>("active");

  const { data, isLoading, error, refetch } = useGetPurchasesByStatus(
    active === "active"
      ? "pending,paid,on_the_way,accepted,collecting"
      : "cancelled,completed",
    session?.user!.id!,
    { enabled: !!session?.user?.id }
  );

  const { loadingRefresh, pullToRefresh } = usePullToRefresh(refetch);

  if (isLoadingSession) {
    return (
      <ThemedView>
        <Loading />
      </ThemedView>
    );
  }

  if (!session) {
    return (
      <ThemedView>
        <Unauthenticated />
      </ThemedView>
    );
  }

  const handleChangeStatus = (status: string) => {
    if (status === active) return;
    setActive(status);
  };

  return (
    <ThemedView>

      {/* Tabs */}
      <View className="flex-row p-1 rounded-2xl mb-4 w-[90%] mx-auto ">
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

      {isLoading && <Loading />}
      {error && <Error message={error.message} />}

      {data?.data && data.data.length > 0 ? (
        <FlatList<IPurchase>
          refreshControl={
            <RefreshControl refreshing={loadingRefresh} onRefresh={pullToRefresh} />
          }
          data={data.data}
          renderItem={({ item }) => <OrderItem item={item} status={active} />}
          keyExtractor={({ purchase_id }) => purchase_id.toString()}
          ItemSeparatorComponent={() => <View className="h-4" />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        !isLoading && (
          <Text className="text-center text-lg">
            There are no orders in this moment
          </Text>
        )
      )}

    </ThemedView>
  );
}