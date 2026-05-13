import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEarning } from "@/core/actions/general/earningsDeliveries.action";

export const usePostEarning = () => {
    const queryClient = useQueryClient();
    const { data, mutate, isPending, error, mutateAsync } = useMutation({
        mutationFn: postEarning,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["earnings-deliveries"] });
        },
    });

    return { data, mutate, isPending, error, mutateAsync };
};
