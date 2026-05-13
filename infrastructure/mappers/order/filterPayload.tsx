import { IOrder,  } from "@/infrastructure/interfaces/order.interface"
import { IProduct } from "@/infrastructure/interfaces/product.interface"

export interface FilterPayload {
    order_items:{
        product:{
            product_id:number,
            stock:number | undefined,
            price:number
        },
        quantity:number
    }[],
}

export const filterPayload = (payload: IOrder) : FilterPayload=> {
    const { products } = payload
    return {
        order_items: products.map((product: { product: IProduct; quantity: number; }) => {
            const { ...rest } = product.product
            return {
                product: {
                    product_id: rest.product_id,
                    stock: rest.stock,
                    price: rest.price,
                },
                quantity: Number(product.quantity)
            }
        })
    }
}