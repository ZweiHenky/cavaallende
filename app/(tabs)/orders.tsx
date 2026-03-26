import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useGetPurchasesByStatus } from "@/hooks/services/purchases/useGetPurchasesByStatus";
import { ThemedView } from "@/components/ui/ThemedView";
import { authClient } from "@/lib/auth-client";
import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";
import { useState } from "react";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import OrderItem from "@/components/orders/OrderItem";

export default function Orders() {

    const { data: session, isPending: isLoadingSession } = authClient.useSession.get();

    const [active, setActive] = useState<string>("active");

    const { data, isLoading, error } = useGetPurchasesByStatus(
        active === "active" ? "pending,paid,on_the_way" : "cancelled,completed", 
        session?.user!.id!, 
        { enabled: !!session?.user?.id } 
    );

    if (isLoadingSession) {
            return <ThemedView>
                <Loading />
            </ThemedView>;
        }

    if (!session) {
        return <ThemedView>
            <Error message="Please login to view your orders" />
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
                            Active
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
                            History
                    </Text>
                </TouchableOpacity>
            </View>

            {isLoading && <Loading />}
            {error && <Error message={error.message} />}

            {
                data?.data && data.data.length > 0 ? (
                    <FlatList<IPurchase>
                        data={data?.data}
                        renderItem={({ item }) => (
                            <OrderItem item={item} />
                        )} 
                        keyExtractor={({purchase_id}) => purchase_id.toString()}   
                        ItemSeparatorComponent={() => <View className="h-4" />}
                    />
                ) : (
                    <Text className="text-center text-lg"> There are no orders in this moment </Text>
                )
            }
        </ThemedView>
    )
}