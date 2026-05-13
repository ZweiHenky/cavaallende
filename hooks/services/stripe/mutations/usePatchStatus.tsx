import { useMutation } from "@tanstack/react-query";
import { updateStripeAccount } from "@/core/actions/general/stripe.action";
import { UpdateStatusResponse } from "@/infrastructure/responses/stripe/updateStatus.response";

export const usePatchStatus = () => {
    const { data, mutateAsync, isPending, error } = useMutation<UpdateStatusResponse, Error, string>({
        mutationFn: (accountId: string) => updateStripeAccount(accountId),
    })

    return { data, mutateAsync, isPending, error }
}