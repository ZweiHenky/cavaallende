import { getProductsByCategory } from "@/core/actions/general/products.action"
import { useQuery } from "@tanstack/react-query"


export const useGetProductsByCategory = (category: number, selectedType: number | null) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', category, selectedType],
        queryFn: () => getProductsByCategory(category, selectedType)
    })

    return {
        data,
        isLoading,
        error
    }
}