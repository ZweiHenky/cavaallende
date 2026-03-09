export interface ValidateStockResponse {
  status: number;
  message: string;
  data: ValidateStockData[];
}

export interface ValidateStockData {
  product_id: number;
  name: string;
  requested: number;
  available: number;
}
