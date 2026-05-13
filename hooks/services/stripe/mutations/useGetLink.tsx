import { useMutation } from "@tanstack/react-query"
import { createLinkConnect } from "@/core/actions/general/stripe.action"
import { CreateLinkResponse } from "@/infrastructure/responses/stripe/createLink.response"

export const useGetLink = () => {
    const { data, mutateAsync, isPending, error } = useMutation<CreateLinkResponse, Error, string>({
        mutationFn: (accountId: string) => createLinkConnect(accountId),
    })

    return { data, mutateAsync, isPending, error }
}