import { ThemedView } from '@/components/ui/ThemedView'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useShop } from '@/store/useShop';
import HeaderBack from '@/components/ui/HeaderBack';
import TrashIcon from '@/assets/icons/TrashIcon';
import ItemShop from '@/components/shop/ItemShop';
import ShowBill from '@/components/shop/ShowBill';
import { useUserLocation } from '@/hooks/config/useUserLocation';
import { calculateShippingPrice } from '@/utils/shop/calculateShippingPrice';



export default function Index() {

    const { order, clearOrder } = useShop()
    const { location } = useUserLocation()

    const [costShipping, setCostShipping] = React.useState(0)

    React.useEffect(() => {
        if (location) {
            const precioEnvio = calculateShippingPrice(location.latitude, location.longitude, 19.405914616000153, -99.17565470371922)
            setCostShipping(Number(precioEnvio.precio))
        }
    }, [location])


  return (
    <ThemedView>

      <HeaderBack title='Shop' />

      {
        order.products.length > 0 && (
          <View className='w-[95%] mx-auto flex-row items-center justify-between mt-4 mb-4'>
            <Text className='text-xl font-bold text-black text-center '>Clear all</Text>
            <TouchableOpacity className='' onPress={() => clearOrder()}>
              <TrashIcon color='#c9a24d' size={28} /> 
            </TouchableOpacity>
          </View>
        )
      }

      {
        order.products.length === 0 ? (
            <Text className='text-center text-xl font-bold text-black  mt-10'>Your cart is empty</Text>
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

      {
        order.products.length > 0 && (
            <ShowBill subtotal={order.total} costShipping={costShipping} />
        )
      }
    </ThemedView>
  ) 
}
