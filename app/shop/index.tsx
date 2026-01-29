import { ThemedView } from '@/components/ui/ThemedView'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useShop } from '@/store/useShop';
import HeaderBack from '@/components/ui/HeaderBack';
import TrashIcon from '@/assets/icons/TrashIcon';
import { formatterCurrency } from '@/utils/formatterCurrency';
import ItemShop from '@/components/shop/ItemShop';



export default function Index() {

    const { order, clearOrder } = useShop()

  return (
    <ThemedView>

      <HeaderBack title='Shop' />

      {/* <View className='w-[95%] mx-auto flex-row items-center justify-between mt-4 mb-4'>
        <Text className='text-xl font-bold text-black text-center '>Clear all</Text>
        <TouchableOpacity className='' onPress={() => clearOrder()}>
          <TrashIcon color='#c9a24d' size={28} /> 
        </TouchableOpacity>
      </View> */}

      {
        order.products.length === 0 ? (
            <Text>No products found</Text>
        ):
        (
            <FlatList
            data={order.products}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <ItemShop item={item} />}
            ItemSeparatorComponent={() => <View className='h-4' />}
          />
        )
      }

      <View className='w-[95%] mx-auto flex-col  bg-white p-4 mt-4 mb-4 rounded-2xl'>
        <View className='flex-row justify-between'>
          <Text className='text-lg  text-black  '>Subtotal:</Text>
          <Text className='text-lg  text-black  '>{formatterCurrency(order.total)}</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='text-lg  text-black  '>Envio:</Text>
          <Text className='text-lg  text-black  '>{formatterCurrency(10)}</Text>
        </View>
        <View className='h-[0.5px] bg-slate-200 my-2 rounded-full ' />
        <View className='flex-row justify-between'>
          <Text className='text-xl font-bold text-black  '>Total:</Text>
          <Text className='text-xl font-bold text-black  '>{formatterCurrency(order.total + 10)}</Text>
        </View>
        <TouchableOpacity className='bg-tertiary rounded-2xl p-4 w-full mt-4 ' onPress={() => clearOrder()}>
          <Text className='text-xl font-bold text-white text-center '>Pay</Text>
        </TouchableOpacity>
      </View>

    </ThemedView>
  ) 
}
