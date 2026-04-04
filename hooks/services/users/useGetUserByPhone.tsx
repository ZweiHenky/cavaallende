import { useQuery } from "@tanstack/react-query";
import { getUserByPhone } from "@/core/actions/general/users.action";

export const useGetUserByPhone = (phoneNumber: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["user", phoneNumber],
        queryFn: () => getUserByPhone(phoneNumber),
    });

    return { data, isLoading, error };
}