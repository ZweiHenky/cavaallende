import apiGeneral from "@/core/api/apiGeneral";
import { filterPayload } from "@/infrastructure/mappers/order/filterPayload";
import { PaymentSheetResponse } from "@/infrastructure/responses/paymentSheet.response";


interface PaymentSheetProps {
    amount: number,
    currency: string,
    metadata: {
        userId: string
        order: filterPayload[]
        email: string
    }
}

export const PaymentSheet = async ({amount, currency, metadata}: PaymentSheetProps) : Promise<PaymentSheetResponse> => {
    const res = await apiGeneral.post("/stripe/create-payment-sheet", {
        amount,
        currency,
        metadata
    })
    
    const data:PaymentSheetResponse = await res.data.data

    return data
}