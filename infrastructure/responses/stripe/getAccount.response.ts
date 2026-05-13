import { StripeAccountStripeInterface } from "@/infrastructure/interfaces/stripeAccount.stripe.interface";

export interface GetAccountResponse {
    status: string;
    message: string;
    data?: StripeAccountStripeInterface;
}