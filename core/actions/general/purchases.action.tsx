import apiGeneral from "@/core/api/apiGeneral";
import { GetOrdersByStatusResponse } from "@/infrastructure/responses/purchases/getOrdersByStatus.response";
import { GetPurchaseDetailResponse } from "@/infrastructure/responses/purchases/getPurchaseDetail.response";

export const getPurchasesByStatus = async (status: string, user_id: string): Promise<GetOrdersByStatusResponse> => {
   try {
    const res = await apiGeneral.get<GetOrdersByStatusResponse>(`/purchases/search?status=${status}&user_id=${user_id}`);
    return res.data;
   } catch (error) {
    throw error;
   }
};

export const updateStatus = async (id: string, status: string) => {
    try {
        const res = await apiGeneral.put(`/purchases/status/${id}`, { status });
        return res;
    } catch (error) {
        throw error;
    }
};

export const getPurchaseDetail = async (id: string): Promise<GetPurchaseDetailResponse> => {
    try {
        const res = await apiGeneral.get<GetPurchaseDetailResponse>(`/purchases/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
