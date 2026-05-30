import { useQuery } from "@tanstack/react-query";
import { getPurchasesToday } from "@/core/actions/general/purchases.action";
import { GetOrdersByStatusResponse } from "@/infrastructure/responses/purchases/getOrdersByStatus.response";

export const useGetPurchasesToday = (status: string) => {
    const { data, isLoading, error, refetch } = useQuery<GetOrdersByStatusResponse>({
        queryKey: ["purchases-today", status],
        queryFn: () => getPurchasesToday(status),
        enabled: !!status,
    });

    return { data, isLoading, error, refetch };
};