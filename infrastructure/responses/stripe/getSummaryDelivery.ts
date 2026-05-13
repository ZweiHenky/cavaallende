export interface getSummaryDeliveryResponse {
    data: {
        available: number,
        pending: number
    }
    message: string,
    status: string
}