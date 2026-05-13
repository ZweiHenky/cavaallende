import { validateStock } from "@/core/actions/general/products.action"
import { FilterPayload } from "@/infrastructure/mappers/order/filterPayload"
import { useQuery } from "@tanstack/react-query"

export const useValidateStock = (products: FilterPayload) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['validate-stock'],
        queryFn: () => validateStock(products),
        enabled: !!products
    })

    return {data, isLoading, error}
}