import { IOrder,  } from "@/infrastructure/interfaces/order.interface"
import { IProduct } from "@/infrastructure/interfaces/product.interface"

export const filterPayload = (payload: IOrder) => {
    const { products } = payload
    return products.map((product: { product: IProduct; quantity: number; }) => {
        const { ...rest } = product.product
        return {
            product: {
                product_id: rest.product_id,
                name: rest.name,
                stock: rest.stock,
            },
            quantity: Number(product.quantity)
        }
    })

}