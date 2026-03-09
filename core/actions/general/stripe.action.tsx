import apiGeneral from "@/core/api/apiGeneral";
import { PaymentSheetResponse } from "@/infrastructure/responses/paymentSheet.response";


export const PaymentSheet = async ({amount, currency}: {amount: number, currency: string}) : Promise<PaymentSheetResponse> => {
    const res = await apiGeneral.post("/stripe/create-payment-sheet", {
        amount,
        currency
    })
    
    const data:PaymentSheetResponse = await res.data.data

    return data
}