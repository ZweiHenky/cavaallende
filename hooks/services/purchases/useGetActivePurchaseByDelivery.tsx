import { useQuery } from "@tanstack/react-query";
import { getActivePurchaseByDelivery } from "@/core/actions/general/purchases.action";

export const useGetActivePurchaseByDelivery = (deliveryId: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["active-purchase", deliveryId],
        queryFn: () => getActivePurchaseByDelivery(deliveryId),
        enabled: !!deliveryId,
    });
    return { data, isLoading, error };
};
