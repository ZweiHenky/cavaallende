import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignDelivery } from "@/core/actions/general/purchases.action";

export const usePatchAssignDelivery = () => {
    const queryClient = useQueryClient();
    const { data, mutate, isPending, error } = useMutation({
        mutationFn: ({ id, delivery_id }: { id: number, delivery_id: string }) => assignDelivery(id, delivery_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["purchases-today"] });
        },
    });

    return { data, mutate, isPending, error };
};