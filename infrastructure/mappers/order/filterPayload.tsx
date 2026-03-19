import { IOrder,  } from "@/infrastructure/interfaces/order.interface"
import { IProduct } from "@/infrastructure/interfaces/product.interface"

export interface filterPayload {
    product:{
        product_id:number,
        name:string,
        stock:number | undefined
    },
    quantity:number
}

export const filterPayload = (payload: IOrder) : filterPayload[] => {
    const { products } = payload
    return products.map((product: { product: IProduct; quantity: number; }) => {
        const { ...rest } = product.product
        return {
            product: {
                product_id: rest.product_id,
                name: rest.name,
                stock: rest.stock,
                price: rest.price,
            },
            quantity: Number(product.quantity)
        }
    })

}