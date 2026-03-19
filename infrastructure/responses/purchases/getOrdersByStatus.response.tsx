import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";


export interface GetOrdersByStatusResponse {
    status: string;
    data:   IPurchase[];
}
