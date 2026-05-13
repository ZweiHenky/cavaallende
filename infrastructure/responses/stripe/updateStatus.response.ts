import { IStripeAccount } from "@/infrastructure/interfaces/stipeAccount.interface";

export interface UpdateStatusResponse {
    status: string;
    message: string;
    data?: IStripeAccount;
}