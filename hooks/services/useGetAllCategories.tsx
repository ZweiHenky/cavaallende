import { getAllCategories } from "@/core/actions/general/categories.action"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCategories = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    })

    return { data, isLoading, error }
}