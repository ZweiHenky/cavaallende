import { useQuery } from "@tanstack/react-query"
import { getAllTypes } from "@/core/actions/general/types.action"

export const useGetAllTypes = () => {

    const { data: types, isLoading, error } = useQuery({
        queryKey: ["types"],
        queryFn: getAllTypes,
    });

    return { types, isLoading, error };
}