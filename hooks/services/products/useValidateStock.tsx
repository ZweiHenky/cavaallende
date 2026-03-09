import { validateStock } from "@/core/actions/general/products.action"
import { useQuery } from "@tanstack/react-query"

export const useValidateStock = (products: any[]) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['validate-stock'],
        queryFn: () => validateStock(products),
        enabled: !!products
    })

    return {data, isLoading, error}
}