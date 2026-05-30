import { useQuery } from "@tanstack/react-query"
import { getBalanceStripe } from "@/core/actions/general/stripe.action"

interface UseGetBalanceProps {
    accountId: string
}

export const useGetBalance = ({ accountId }: UseGetBalanceProps) => {
    return useQuery({
        queryKey: ["balance", accountId],
        queryFn: () => getBalanceStripe(accountId),
        enabled: !!accountId
    })
}