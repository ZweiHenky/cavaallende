export interface IPurchase {
    purchase_id:       number;
    user_id:           string;
    created_at:        string;
    subtotal:          string;
    discount:          string;
    taxes:             string;
    shipping_cost:     string;
    total:             string;
    payment_method:    string;
    payment_reference: string | null;
    status:            string;
    shipping_address:  string | null;
    notes:             string | null;
}