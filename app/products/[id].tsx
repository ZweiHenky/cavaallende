import React from 'react'
import { ThemedView } from '@/components/ui/ThemedView'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import WineIcon from '@/assets/icons/WineIcon'
import { Header } from '@/components/tabs/Header'
import { formatterCurrency } from '@/utils/formatterCurrency'
import MinusIcon from '@/assets/icons/MinusIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import { useShop } from '@/store/useShop'
import { useLocalSearchParams } from 'expo-router'

const data = {
  id: 1,
  name: 'Cabernet Sauvignon',
  price: 10,
  image: '/vino.png',
  producer: 'Caza Anza',
  label: 'Syrah, Cabernet Sauvignon, Tempranillo y Malbec.',
  variant: 'Syrah, Cabernet Sauvignon, Tempranillo y Malbec.',
  fermentation: 'Fermentado en ánfora de concreto y roble francés.',
  vintages: '2019, con capacidad de guarda de 10 a 15 años.',
  temperature: '18° y 20° C.',
  description: {
    nose: 'Especiado y herbal, frutos maduros a higo y ciruela, notas marcadas a vainilla y caramelo.',
    view: 'Granate con reflejos rubí y carmín.',
    mouth: 'Se reafirman las notas a vainilla, nuez moscada y café; de gran cuerpo con taninos presentes y acidez fresca.',
  },
  recomdation: 'Se reafirman las notas a vainilla, nuez moscada y café; de gran cuerpo con taninos presentes y acidez fresca.',
}

export default function DetailsProduct() {

  const { id } = useLocalSearchParams()

  const { addQuantity, removeQuantity, order, addProduct } = useShop();

  const product = order.products.find((product) => product.product.id === Number(id))

  return (
    <ThemedView withPaddingBottom={false}>
      <Header  />
      <ScrollView  
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          paddingBottom: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className='w-full h-52 flex-row justify-center items-center px-2'>
          <Image 
          source={require('@/assets/images/vino.png')} 
          className='w-1/2' 
          resizeMode='contain' 
          />
          <View className='w-1/2 h-80 justify-center gap-2 '>
            <Text 
            numberOfLines={2}
            ellipsizeMode="tail"
            className='text-2xl font-bold text-primary'
            > 
              {data.name}
            </Text>
            <Text className='text-lg font-bold text-textColor '>
              {data.producer}
            </Text>
            <Text className='text-2xl font-bold text-primary '>
              {formatterCurrency(data.price)}
            </Text>
            {
              product &&
              product.quantity > 0 ? (
                <View className='flex-row items-center justify-center w-full gap-4 bg-tertiary rounded-full px-2 py-2'>
                  <TouchableOpacity onPress={() => removeQuantity(data.id)}>
                    <MinusIcon color='white' size={24} />
                  </TouchableOpacity>
                  <Text className='text-white text-lg'>{product?.quantity}</Text>
                  <TouchableOpacity onPress={() => addQuantity(data.id)}>
                    <PlusIcon color='white' size={24} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity className='bg-tertiary rounded-2xl p-2 w-full ' onPress={() => addProduct(data)}>
                  <Text className='text-lg font-bold text-secondary text-center '>Add</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>

        <Text className='text-3xl p-2 font-bold text-secondary '>
          Características
        </Text>

        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 
          numberOfLines={3}
          ellipsizeMode="tail"
          className='text-lg p-2 w-4/5'>{data.variant}</Text>
        </View>

        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 
          numberOfLines={3}
          ellipsizeMode="tail"
          className='text-lg p-2 w-4/5'>{data.fermentation}</Text>
        </View>


        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 
          numberOfLines={3}
          ellipsizeMode="tail"
          className='text-lg p-2 w-4/5'>{data.vintages}</Text>
        </View>

        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 
          numberOfLines={3}
          ellipsizeMode="tail"
          className='text-lg p-2 w-4/5'>{data.temperature}</Text>
        </View>

        <Text className='text-3xl p-2 font-bold text-secondary '>
          Descripción
        </Text>

        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 

          className='text-lg p-2 w-4/5'>{data.description.nose}</Text>
        </View>

        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 

          className='text-lg p-2 w-4/5'>{data.description.view}</Text>
        </View>

        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 

          className='text-lg p-2 w-4/5'>{data.description.mouth}</Text>
        </View>

        <Text className='text-3xl p-2 font-bold text-secondary '>
          Recomendación
        </Text>

        <View className='flex-row items-center gap-2 w-[90%] mx-auto shadow-lg bg-white p-2 rounded-2xl'>
          <View className='rounded-xl p-2'>
            <WineIcon size={24} color="#c9a24d" />
          </View>
          <Text 

          className='text-lg p-2 w-4/5'>{data.recomdation}</Text>
        </View>
      </ScrollView>


    </ThemedView>
  )
}
