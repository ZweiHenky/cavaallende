import { EarningsDeliveriesInterface } from "../interfaces/earningsDeliveries.interface";

export interface PostEarningResponse {
    status: number;
    message: string;
    data: EarningsDeliveriesInterface;
}
