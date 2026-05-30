import { useMutation } from "@tanstack/react-query";
import { updateUserRole } from "@/core/actions/general/users.action";

export const useUpdateUserRole = () => {
    const mutation = useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: string }) => updateUserRole(userId, role),
    });

    return mutation;
}
