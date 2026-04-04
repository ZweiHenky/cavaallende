import { IPurchaseItem } from "@/infrastructure/interfaces/purchase_item.interface";

export interface GetPurchaseDetailResponse {
    status: string;
    data: {
        purchase_id: number;
        user_id: string;
        discount: string;
        notes: string | null;
        payment_method: string;
        payment_reference: string;
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
        user_name: string;
        user_phone: string;
        delivery_name: string;
        delivery_phone: string;
        purchase_items: IPurchaseItem[];
    }
}