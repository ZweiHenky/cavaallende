 import { useQuery } from "@tanstack/react-query"
import { getProductById } from "@/core/actions/general/products.action"

export const useGetProductById = (id: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
    })

    return { data, isLoading, error }
}