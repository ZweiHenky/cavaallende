import { PaymentSheet } from '@/core/actions/general/stripe.action'
import * as Linking from 'expo-linking'
import { useShop } from '@/store/useShop'
import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Text, TouchableOpacity } from 'react-native'
import { filterPayload } from '@/infrastructure/mappers/order/filterPayload'
import { useValidateStock } from '@/hooks/services/products/useValidateStock'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'expo-router'
import { useLocationStore } from '@/store/useLocationStore'


export default function CheckoutForm() {

    const router = useRouter()

    const { order, clearOrder } = useShop()
    const { data: user } = authClient.useSession()
    const [loading, setLoading] = useState(false)
    const filteredProducts = filterPayload(order)
    const { initPaymentSheet, presentPaymentSheet } = useStripe()
    let {data:resValidateStock, error:stockError} = useValidateStock(filteredProducts)
    const { address, lastKnownLocation } = useLocationStore()

    const initializePaymentSheet = async () => {

        setLoading(true)

        if (!user) return Alert.alert("Error", "Inicia sesión para realizar el pago")

        if (!user.user.phoneNumber) {
            Alert.alert("Error", "Debes agregar un número de teléfono para realizar el pago")
            setTimeout(() => {
                router.replace('/config/newPhone')
            }, 500);
            setLoading(false)
            return
        }
        
        try {

            if (stockError) return Alert.alert("Error", stockError.message)

            if (resValidateStock?.status === 400) return Alert.alert("Error", resValidateStock.message)

            const metadata = {
                userId: user?.user.id,
                order: filterPayload(order),
                email: user?.user.email,
                location: {
                    latitude: lastKnownLocation?.latitude,
                    longitude: lastKnownLocation?.longitude,
                    text_address: address?.formattedAddress
                }
            }

            console.log(metadata.order)

            const { paymentIntent, ephemeralKey, customer } = await PaymentSheet({amount: order.total, currency: "mxn", metadata})

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
                    clearOrder()
                    router.replace("/(tabs)/orders")
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
        {loading ? (
            <ActivityIndicator color="white" />
        ) : (
            <Text className='text-xl font-bold text-white text-center '>Pay</Text>
        )}
    </TouchableOpacity>
  )
}
