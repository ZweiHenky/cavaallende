export interface IProduct {
    product_id: number;
    name: string;
    price: number;
    stock?: number;
    image: string | any;
    is_active?: boolean | null;
    category_id?: number;
    producer: string;
    variant?: string;
    fermentation?: string;
    vintages?: string;
    temperature?: string;
    noise?: string | null;
    view?: string;
    mouth?: string;
    recomendation?: string;
    label?: string;
}