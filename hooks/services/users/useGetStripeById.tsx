import { getStripeByUserId } from "@/core/actions/general/users.action";
import { useQuery } from "@tanstack/react-query";

export const useGetStripeByUserId = (userId: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["stripe", userId],
        queryFn: () => getStripeByUserId(userId),
    });

    return { data, isLoading, error, refetch };
}