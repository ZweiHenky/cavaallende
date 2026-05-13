import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPayout } from "@/core/actions/general/payoutsDeliveries.action";

export const usePostPayout = () => {
    const queryClient = useQueryClient();
    const { data, mutate, isPending, error } = useMutation({
        mutationFn: postPayout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payouts-deliveries"] });
        },
    });

    return { data, mutate, isPending, error };
};
