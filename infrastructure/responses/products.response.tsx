import { IPagination } from "../interfaces/pagination.interface";
import { IProduct } from "../interfaces/product.interface";


export interface ProductsResponse {
	status: string;
	data: {
		products: IProduct[];
		pagination: IPagination;
	};
}
