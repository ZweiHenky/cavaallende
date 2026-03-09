import { PaymentSheet } from '@/core/actions/general/stripe.action'
import * as Linking from 'expo-linking'
import { useShop } from '@/store/useShop'
import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { filterPayload } from '@/infrastructure/mappers/order/filterPayload'
import { useValidateStock } from '@/hooks/services/products/useValidateStock'

export default function CheckoutForm() {

    const { order } = useShop()
    const [loading, setLoading] = useState(false)
    const filteredProducts = filterPayload(order)
    const { initPaymentSheet, presentPaymentSheet } = useStripe()
    let {data, error:stockError} = useValidateStock(filteredProducts)

    const initializePaymentSheet = async () => {

        setLoading(true)

        try {

            if (stockError) {
                Alert.alert("Error", "Error al validar el stock")
                return
            }

            if (data) {
                Alert.alert("Error", "Stock no disponible")
                return
            }


            const { paymentIntent, ephemeralKey, customer } = await PaymentSheet({amount: order.total, currency: "mxn"})

            const {error} = await initPaymentSheet({
                paymentIntentClientSecret: paymentIntent,
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                allowsDelayedPaymentMethods: true,
                merchantDisplayName: "Cava Allende",
                defaultBillingDetails: {
                    name: "Cava Allende",
                    email: "cavaallende@gmail.com",
                    phone: "1234567890",
                },
                // returnURL: Linking.createURL("stripe-redirect"),
                // applePay:{
                //     merchantCountryCode: "US",
                // }
            })

            if (!error) {
                // setLoading(true)
                const {error} = await presentPaymentSheet()
                if (!error) {
                    Alert.alert("Payment successful")
                }else{
                    Alert.alert("Payment failed")
                }
            }

        } catch (error) {
            console.log(error)
        }

        setLoading(false)
    }



  return (
    <TouchableOpacity disabled={loading} className='bg-tertiary rounded-2xl p-4 w-full mt-4 ' onPress={ initializePaymentSheet}>
        <Text className='text-xl font-bold text-white text-center '>Pay</Text>
    </TouchableOpacity>
  )
}
