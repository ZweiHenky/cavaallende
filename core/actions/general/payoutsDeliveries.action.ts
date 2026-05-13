import apiGeneral from "@/core/api/apiGeneral";
import { PostPayoutResponse } from "@/infrastructure/responses/payoutsDeliveries.response";

interface CreatePayoutParams {
    user_id?: string;
    total_amount?: number;
    status?: string;
    payment_method?: string;
}

export const postPayout = async (data: CreatePayoutParams): Promise<PostPayoutResponse> => {
    try {
        const res = await apiGeneral.post<PostPayoutResponse>("/payouts-deliveries", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
