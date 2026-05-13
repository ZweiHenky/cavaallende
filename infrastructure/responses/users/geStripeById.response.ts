import { StripeAccountInterface } from "@/infrastructure/interfaces/stipeAccount.interface";

export interface StripeAccountResponse {
    data: StripeAccountInterface;
    message: string;
    status: number;
}