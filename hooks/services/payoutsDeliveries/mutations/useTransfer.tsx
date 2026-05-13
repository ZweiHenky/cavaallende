import { useMutation } from "@tanstack/react-query"
import { transferPayout } from "@/core/actions/general/stripe.action"
import { Alert } from "react-native"

export function useTransfer() {
    const { mutate, isPending } = useMutation({
        mutationFn: ({ user_id, amount }: { user_id: string, amount: number }) => transferPayout(user_id, amount),
        onSuccess: () => {
            Alert.alert("Transferencia exitosa")
        },
        onError: (error: any) => {
            Alert.alert("Error", error?.message)
        }
    })

    return { transfer: mutate, isPending }
}