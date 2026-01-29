import apiGeneral from "@/core/api/apiGeneral"
import { DetailProductResponse } from "@/infrastructure/responses/detailProduct.response"
import { ProductsResponse } from "@/infrastructure/responses/products.response"

export const getProductsByCategory = async (category: number): Promise<ProductsResponse> => {
    
    try {
        const response = await apiGeneral.get(`/products/category/${category}`)
        const data: ProductsResponse = response.data
        return data
    } catch (error) {
        console.log(error)
        throw error
    }

}

export const getProductById = async (id: number): Promise<DetailProductResponse["data"]> => {
    
    try {
        const response = await apiGeneral.get(`/products/${id}`)
        const data: DetailProductResponse = response.data
        return data.data
    } catch (error) {
        console.log(error)
        throw error
    }

}
