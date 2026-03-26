import { useQuery } from "@tanstack/react-query";
import { getPurchasesToday } from "@/core/actions/general/purchases.action";
import { GetOrdersByStatusResponse } from "@/infrastructure/responses/purchases/getOrdersByStatus.response";

export const useGetPurchasesToday = (options?: any) => {
    const { data, isLoading, error } = useQuery<GetOrdersByStatusResponse>({
        queryKey: ["purchases-today"],
        queryFn: () => getPurchasesToday(),
        ...options
    });

    return { data, isLoading, error };
};