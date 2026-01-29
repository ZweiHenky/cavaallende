import apiGeneral from "@/core/api/apiGeneral"
import { CategoriesResponse } from "@/infrastructure/responses/categories.response"


export const getAllCategories = async (): Promise<CategoriesResponse["data"]> => {
    try {
        const response = await apiGeneral.get("/categories")
        const data: CategoriesResponse = response.data
        return data.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
