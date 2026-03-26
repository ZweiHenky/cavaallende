export interface GetPurchaseDetailResponse {
    status: string;
    data: {
        purchase_id: number;
        user_id: string;
        discount: string;
        notes: string | null;
        payment_method: string;
        payment_reference: string;
        shipping_address: string | null;
        shipping_cost: string;
        status: string;
        subtotal: string;
        taxes: string;
        total: string;
        created_at: string;
        updated_at?: string;
        location_id: number;
        latitude: string;
        longitude: string;
        text_address: string;
        purchase_items: {
            purchase_item_id?: number;
            purchase_id: number;
            product_id: string;
            quantity: number;
            unit_price: string;
            line_total: string;
            product_name?: string;
            product_image?: string | null;
            category_id?: number;
            type_id?: number;
            created_at?: string;
        }[];
    }
}