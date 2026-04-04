import apiGeneral from "@/core/api/apiGeneral";
import { GetUserByPhoneResponse } from "@/infrastructure/responses/users/getUserByPhone.response";

export const getUserByPhone = async (phoneNumber: string): Promise<GetUserByPhoneResponse> => {
    try {
        const response = await apiGeneral.get<GetUserByPhoneResponse>(`/users/phone/${phoneNumber}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}