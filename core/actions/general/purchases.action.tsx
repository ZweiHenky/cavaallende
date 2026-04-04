import apiGeneral from "@/core/api/apiGeneral";
import { GetOrdersByStatusResponse } from "@/infrastructure/responses/purchases/getOrdersByStatus.response";
import { GetPurchaseDetailResponse } from "@/infrastructure/responses/purchases/getPurchaseDetail.response";
import { PatchAssignDeliveryResponse } from "@/infrastructure/responses/purchases/patchAssignDelivery.response";


export const getPurchasesToday = async (status?: string): Promise<GetOrdersByStatusResponse> => {
    try {
        const res = await apiGeneral.get<GetOrdersByStatusResponse>(`/purchases/today?status=${status}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

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
        const res = await apiGeneral.patch(`/purchases/status/${id}`, { status });
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

export const assignDelivery = async (id: number, delivery_id: string): Promise<PatchAssignDeliveryResponse> => {
    try {
        const res = await apiGeneral.patch<PatchAssignDeliveryResponse>(`/purchases/assign-delivery/${id}`, { delivery_id });
        return res.data;
    } catch (error) {
        throw error;
    }
};

