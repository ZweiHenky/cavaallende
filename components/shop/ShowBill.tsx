import { Text, View } from "react-native";
import CheckoutForm from "./stripe/CheckoutForm";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { useLocationStore } from "@/store/useLocationStore";

export default function ShowBill({subtotal, shippingCost}: {subtotal: number, shippingCost: number}) {

    const { address } = useLocationStore()

    return (
        <View className='w-[95%] mx-auto flex-col  bg-white p-4 mt-4 mb-4 rounded-2xl'>

            {address && (
                <View className='flex-row justify-between mb-4 border-b border-slate-200 pb-4 items-center '>
                    <Text className='text-lg  text-black w-[30%]  '>Direccion:</Text>
                    <Text className='text-lg  text-black  w-[70%] text-right' numberOfLines={3} ellipsizeMode="tail">{address.formattedAddress}</Text>
                </View>
            )}

            <View className='flex-row justify-between'>
            <Text className='text-lg  text-black  '>Subtotal:</Text>
            <Text className='text-lg  text-black  '>{formatterCurrency(subtotal)}</Text>
            </View>
            <View className='flex-row justify-between'>
            <Text className='text-lg  text-black  '>Envio:</Text>
            <Text className='text-lg  text-black  '>{formatterCurrency(shippingCost)}</Text>
            </View>
            <View className='h-[0.5px] bg-slate-200 my-2 rounded-full ' />
            <View className='flex-row justify-between'>
            <Text className='text-xl font-bold text-black  '>Total:</Text>
            <Text className='text-xl font-bold text-black  '>{formatterCurrency(subtotal + shippingCost)}</Text>
            </View>
            <CheckoutForm />
        </View>
    )
}