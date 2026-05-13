import { useQuery } from "@tanstack/react-query";
import { getPurchaseHistoryByUser } from "@/core/actions/general/purchases.action";

export const useGetPurchaseHistoryByUser = (userId: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["purchase-history", userId],
        queryFn: () => getPurchaseHistoryByUser(userId),
        enabled: !!userId,
    });
    return { data, isLoading, error };
};
