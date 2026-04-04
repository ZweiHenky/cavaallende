import { useEffect } from "react";

import socket from "@/core/socket/connect";
import { useQueryClient } from "@tanstack/react-query";

export const useOnCreatePurchase = () => {

    const queryClient = useQueryClient();

    useEffect(() => {


        const handleCreatePurchase = (id: string) => {
            if (id) {
                queryClient.invalidateQueries({ queryKey: ["purchases-today"] });
            }
        };

        socket.on("purchaseCreated", handleCreatePurchase);

        return () => {
            socket.off("purchaseCreated", handleCreatePurchase);
        };
    }, [queryClient]);
};