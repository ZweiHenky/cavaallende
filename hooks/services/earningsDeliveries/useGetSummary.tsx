import { useQuery } from "@tanstack/react-query";
import { summaryEarnings } from "@/core/actions/general/stripe.action";
import { getSummaryDeliveryResponse } from "@/infrastructure/responses/stripe/getSummaryDelivery";

export const useGetSummary = (user_id: string) => {
    const { data, isLoading, error } = useQuery<getSummaryDeliveryResponse>({
        queryKey: ["summary", user_id],
        queryFn: () => summaryEarnings(user_id),
    });

    return {
        data,
        isLoading,
        error
    };
};