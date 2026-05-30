import { getPurchaseHistoryByDelivery } from "@/core/actions/general/purchases.action";
import { useQuery } from "@tanstack/react-query";

export const useGetHistoryByDelivery = (delivery_id: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["purchases-history-delivery", delivery_id],
        queryFn: () => getPurchaseHistoryByDelivery(delivery_id),
        enabled: !!delivery_id,
    });

    return { data, isLoading, error, refetch };
};