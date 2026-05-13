export interface IStripeAccount {
    stripe_id: string;
    user_id: string;
    amount: number;
    is_active: boolean;
}