import apiGeneral from "@/core/api/apiGeneral";
import { StripeAccountResponse } from "@/infrastructure/responses/users/geStripeById.response";
import { GetUserByPhoneResponse } from "@/infrastructure/responses/users/getUserByPhone.response";

export const getUserByPhone = async (phoneNumber: string): Promise<GetUserByPhoneResponse> => {
    try {
        const response = await apiGeneral.get<GetUserByPhoneResponse>(`/users/phone/${phoneNumber}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getStripeByUserId = async (userId: string): Promise<StripeAccountResponse | null> => {
    try {
        const response = await apiGeneral.get<StripeAccountResponse>(`/users/stripe/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}