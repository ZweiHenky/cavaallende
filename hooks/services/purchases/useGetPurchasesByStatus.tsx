import { getPurchasesByStatus } from "@/core/actions/general/purchases.action";
import { GetOrdersByStatusResponse } from "@/infrastructure/responses/purchases/getOrdersByStatus.response";
import { useQuery } from "@tanstack/react-query";

export const useGetPurchasesByStatus = (
  status: string,
  userId: string,
  options?: any
) => {
   const { data, isLoading, error, refetch } = useQuery<GetOrdersByStatusResponse>({
    queryKey: ["purchases", status, userId],
    queryFn: () => getPurchasesByStatus(status, userId),
    enabled: !!userId,
    ...options
  });

  return {
    data,
    isLoading,
    error,
    refetch
  }
};