import { useQuery } from "@tanstack/react-query";
import { getPurchaseDetail } from "@/core/actions/general/purchases.action";

export const useGetDetailPurchase = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["purchases", "detail"],
        queryFn: () => getPurchaseDetail(id),
    });
    return { data, isLoading, error };
};