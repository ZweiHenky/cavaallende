import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { formatterCurrency } from '@/utils/formatterCurrency'
import MinusIcon from '@/assets/icons/MinusIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import { useShop } from '@/store/useShop'
import { useImages } from '@/store/useImages'

interface ProductHeroProps {
  data: any;
}

export default function ProductHero({ data }: ProductHeroProps) {
  const { addQuantity, removeQuantity, order, addProduct } = useShop();
  const images = useImages();
  const product = order.products.find((p: any) => p.product.product_id === data.product_id);

  return (
    <View className='w-full h-64 flex-row justify-center items-center px-2'>
      <Image 
        source={images.getImage(data.image)} 
        className='w-1/2' 
        resizeMode='contain' 
      />
      <View className='w-1/2 justify-center gap-[6px] pl-2'>
        <Text 
          numberOfLines={2}
          ellipsizeMode="tail"
          className='text-3xl text-primary leading-tight font-fraunces-semibold'
        > 
          {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
        </Text>
        <Text className='text-[15px] font-medium text-gray-500 mb-0.5'>
          {data.producer}
        </Text>
        <View className='bg-gray-100 self-start  py-1 rounded-md'>
          <Text className='text-[13px] font-semibold text-gray-700'>
            Stock: {data.stock}
          </Text>
        </View>
        <Text className='text-2xl font-bold text-primary mt-1 mb-1.5'>
          {formatterCurrency(data.price)}
        </Text>
        {
          product && product.quantity > 0 ? (
            <View className='flex-row items-center w-[95%] bg-tertiary rounded-xl px-4 py-2.5 shadow-sm'>
              <TouchableOpacity onPress={() => removeQuantity(data.product_id)} className='w-1/3 items-center'>
                <MinusIcon color='white' size={20} />
              </TouchableOpacity>
              <Text className='text-white text-base font-bold text-center w-1/3'>{product?.quantity}</Text>
              <TouchableOpacity onPress={() => addQuantity(data.product_id)} disabled={product.quantity >= data.stock!} className='w-1/3 items-center'>
                <PlusIcon color='white' size={20} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity className='bg-tertiary rounded-xl py-2.5 w-[95%] shadow-sm' onPress={() => addProduct(data)}>
              <Text className='text-base font-bold text-secondary text-center'>Agregar</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}
