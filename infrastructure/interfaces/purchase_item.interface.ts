export interface IPurchaseItem {
    purchase_item_id?: number;
    purchase_id: number;
    product_id: string;
    quantity: number;
    unit_price: string;
    line_total: string;
    product_name?: string;
    product_image?: string ;
    category_id?: number;
    type_id?: number;
    created_at?: string;
}