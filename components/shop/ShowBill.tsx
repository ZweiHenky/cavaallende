import { Text, View } from "react-native";
import CheckoutForm from "./stripe/CheckoutForm";
import { formatterCurrency } from "@/utils/formatterCurrency";

export default function ShowBill({subtotal, costShipping}: {subtotal: number, costShipping: number}) {
    return (
        <View className='w-[95%] mx-auto flex-col  bg-white p-4 mt-4 mb-4 rounded-2xl'>
            <View className='flex-row justify-between'>
            <Text className='text-lg  text-black  '>Subtotal:</Text>
            <Text className='text-lg  text-black  '>{formatterCurrency(subtotal)}</Text>
            </View>
            <View className='flex-row justify-between'>
            <Text className='text-lg  text-black  '>Envio:</Text>
            <Text className='text-lg  text-black  '>{formatterCurrency(costShipping)}</Text>
            </View>
            <View className='h-[0.5px] bg-slate-200 my-2 rounded-full ' />
            <View className='flex-row justify-between'>
            <Text className='text-xl font-bold text-black  '>Total:</Text>
            <Text className='text-xl font-bold text-black  '>{formatterCurrency(subtotal + costShipping)}</Text>
            </View>
            <CheckoutForm />
        </View>
    )
}