import { PayoutsDeliveriesInterface } from "../interfaces/payoutsDeliveries.interface";

export interface PostPayoutResponse {
    status: number;
    message: string;
    data: PayoutsDeliveriesInterface;
}
