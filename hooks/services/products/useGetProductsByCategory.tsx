import { getProductsByCategory } from "@/core/actions/general/products.action"
import { useQuery } from "@tanstack/react-query"


export const useGetProductsByCategory = (category: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', category],
        queryFn: () => getProductsByCategory(category)
    })

    return {
        data,
        isLoading,
        error
    }
}