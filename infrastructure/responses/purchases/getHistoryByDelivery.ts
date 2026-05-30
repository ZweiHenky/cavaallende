import { IPurchase } from "@/infrastructure/interfaces/purchase.interface";

export interface GetHistoryByDeliveryResponse {
    data: IPurchase[];
    message: string;
    status: number;
    success: boolean;
}