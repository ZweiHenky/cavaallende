import { useQuery } from "@tanstack/react-query";
import { getConnectAccount } from "@/core/actions/general/stripe.action";

export const useGetAccount = (accountId: string) => {
    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ["stripe-account", accountId],
        queryFn: () => getConnectAccount(accountId),
        enabled: !!accountId
    })

    return {data, isLoading, error, refetch}
}