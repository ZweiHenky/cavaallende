import apiGeneral from "@/core/api/apiGeneral"
import { DetailProductResponse } from "@/infrastructure/responses/detailProduct.response"
import { ProductsResponse } from "@/infrastructure/responses/products.response"
import { ValidateStockResponse } from "@/infrastructure/responses/products/validateeStock.response"

export const getProductsByCategory = async (category: number, selectedType: number | null): Promise<ProductsResponse> => {
    console.log(`/products/category?page=1&limit=10&category_id=${category}&type_id=${selectedType}`)
    try {
        const response = await apiGeneral.get(`/products/category?page=1&limit=10&category_id=${category}&type_id=${selectedType}`)
        const data: ProductsResponse = response.data
        return data
    } catch (error) {
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

export const getProductsByName = async (searchText: string, type_id: number | null): Promise<ProductsResponse> => {
    try {
        const response = await apiGeneral.get(`/products/search?page=1&limit=10&name=${searchText}&type_id=${type_id}`)
        const data: ProductsResponse = response.data
        return data
    } catch (error) {
        throw error
    }
}

export const validateStock = async (products: any[]) => {
    try {
        const response = await apiGeneral.post('/products/validate-stock', products)
        const data: ValidateStockResponse = response.data
        return data
    } catch (error) {
        throw error
    }
}
