import { useEffect } from "react";

import socket from "@/core/socket/connect";
import { useQueryClient } from "@tanstack/react-query";

export const useChangeStatus = () => {

    const queryClient = useQueryClient();

    useEffect(() => {

        const handleStatusUpdated = (status: string) => {
            console.log("statusUpdated", status);
            if (status === 'accepted' || status === 'on_the_way' || status === 'completed') {
                queryClient.invalidateQueries({ queryKey: ["purchases-detail"] });
                queryClient.invalidateQueries({ queryKey: ["purchases"] });
            }
        };

        socket.on("statusUpdated", handleStatusUpdated);

        return () => {
            socket.off("statusUpdated", handleStatusUpdated);
        };
    }, [queryClient]);
};