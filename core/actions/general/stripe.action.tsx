import apiGeneral from "@/core/api/apiGeneral";
import { FilterPayload } from "@/infrastructure/mappers/order/filterPayload";
import { PaymentSheetResponse } from "@/infrastructure/responses/paymentSheet.response";
import { CreateAccountDeliveryResponse } from "@/infrastructure/responses/stripe/createAccountDelivery.response";
import { CreateLinkResponse } from "@/infrastructure/responses/stripe/createLink.response";
import { GetAccountResponse } from "@/infrastructure/responses/stripe/getAccount.response";
import { UpdateStatusResponse } from "@/infrastructure/responses/stripe/updateStatus.response";


interface PaymentSheetProps {
    shippingCost: number,
    amount: number,
    currency: string,
    metadata: {
        userId: string
        order: FilterPayload
        email: string
    }
}

export const PaymentSheet = async ({shippingCost, amount, currency, metadata}: PaymentSheetProps) : Promise<PaymentSheetResponse> => {
    const res = await apiGeneral.post("/stripe/create-payment-sheet", {
        shippingCost,
        amount,
        currency,
        metadata
    })
    
    const data:PaymentSheetResponse = await res.data.data

    return data
}

interface CreateConnectAccountProps {
    email: string
    name: string
    userId: string
}

export const createConnectAccount = async ({email, name, userId}: CreateConnectAccountProps) : Promise<CreateAccountDeliveryResponse> => {
    try {
        const res = await apiGeneral.post("/stripe/connect/createAccount", {
            email,
            name,
            user_id: userId
        })

        const data:CreateAccountDeliveryResponse = await res.data.data

        return data
    } catch (error: any) {
        return {accountId: "", message: "Error al crear la cuenta"}
    }
}


export const createLinkConnect = async (accountId: string) : Promise<CreateLinkResponse> => {
    try {
        const res = await apiGeneral.post("/stripe/connect/createLink", {
            accountId
        })

        const data:CreateLinkResponse = await res.data.data
        return data
    } catch (error: any) {
        return {onboardingUrl: "", message: "Error al crear la cuenta", status: 500}
    }
}

export const getConnectAccount = async (accountId: string) : Promise<GetAccountResponse> => {
    try {
        const res = await apiGeneral.get(`/stripe/connect/account/${accountId}`)
        const data:GetAccountResponse = await res.data
        return data
    } catch (error: any) {
        return {status: "error", message: "Error al obtener la cuenta"}
    }
}

export const updateStripeAccount = async (accountId: string) : Promise<UpdateStatusResponse> => {
    try {
        const res = await apiGeneral.patch(`/stripe/connect/status/${accountId}`)
        const data:UpdateStatusResponse = await res.data
        return data
    } catch (error: any) {
        return {status: "error", message: "Error al actualizar la cuenta"}
    }
}

export const summaryEarnings = async (user_id: string) : Promise<any> => {
    try {
        const res = await apiGeneral.get(`/earnings-deliveries/summary/${user_id}`)
        const data:any = await res.data
        return data
    } catch (error: any) {
        return {status: "error", message: "Error al obtener las ganancias"}
    }
}


export const transferPayout = async (user_id: string, amount: number) => {
    try {
        const res = await apiGeneral.post("/payouts-deliveries/transfer", {
            user_id,
            amount
        })

        const data = await res.data

        console.log(data.data)


        return data.data
    } catch (error: any) {
       
        throw new Error("Error al trasnferir, contacte soporte")
    }    
}
