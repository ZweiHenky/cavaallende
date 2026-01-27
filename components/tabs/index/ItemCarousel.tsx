import React from 'react'
import { Text, View } from 'react-native'

export default function ItemCarousel({item}: {item: string}) {
  return (
    <View className='flex-1 items-center justify-center w-[90%] mx-6 px-2 bg-secondary rounded-2xl'>
        <Text className='text-white text-2xl font-bold text-center'>{item}</Text>
    </View>
  )
}
