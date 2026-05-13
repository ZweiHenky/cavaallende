import apiGeneral from "@/core/api/apiGeneral";
import { PostEarningResponse } from "@/infrastructure/responses/earningsDeliveries.response";

interface CreateEarningParams {
    user_id: string;
    purchase_id: number;
    amount: number;
    status: string;
    type: string;
}

export const postEarning = async (data: CreateEarningParams): Promise<PostEarningResponse> => {
    try {
        const res = await apiGeneral.post<PostEarningResponse>("/earnings-deliveries", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
