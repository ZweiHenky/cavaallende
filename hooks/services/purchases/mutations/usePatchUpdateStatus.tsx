import { updateStatus } from "@/core/actions/general/purchases.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchUpdateStatus = () => {
    const queryClient = useQueryClient();
    const { mutate: updateStatusMutation, isPending, error } = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["purchases-today"] });
            queryClient.invalidateQueries({ queryKey: ["purchases-detail"] });
        },
        onError: (error) => {
            console.log(error);
        }
    });
    return { updateStatusMutation, isPending, error };
};