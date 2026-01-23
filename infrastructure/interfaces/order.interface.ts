import { IProduct } from "./product.interface";

export interface IOrder {
    products:{
        product: IProduct;
        quantity: number;
    }[]
    count: number;
    total: number;
}

