import React from 'react'
import { Image, Text, View } from 'react-native'
import { Category } from '@/infrastructure/interfaces/category.interface'

export default function ItemCarousel({item}: {item: Category}) {



  return (
    <View className='flex-1 items-center justify-center w-[90%] mx-6 px-2 bg-transparent'>
        <View className='w-full h-full rounded-2xl absolute top-0  bottom-0'>
            <Image
            source={require('@/assets/images/categories/vinos-semana.jpg')}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 20,
            }}
            />
            <View className='absolute inset-0 bg-black/50 rounded-2xl' />
        </View>
        <Text className='text-white text-3xl text-center px-8 font-fraunces-semibold' >{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
    </View>
  )
}
