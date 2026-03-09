import apiGeneral from "@/core/api/apiGeneral"
import { TypesResponse } from "@/infrastructure/responses/types.response";

export const getAllTypes = async () => {
    try {
        const res = await apiGeneral.get(`/types`);
        const data: TypesResponse = res.data;
        return data.data;
    } catch (error) {
        throw error
    }
}