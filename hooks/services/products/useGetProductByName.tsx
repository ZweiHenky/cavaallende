import { getProductsByName } from "@/core/actions/general/products.action"
import { useQuery } from "@tanstack/react-query"

export const useGetProductByName = (searchText: string, type_id: number | null) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', searchText, type_id],
        queryFn: () => getProductsByName(searchText, type_id)
    })
    return { data, isLoading, error }
}