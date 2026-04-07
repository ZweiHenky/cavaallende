import React from 'react'
import { Text, View } from 'react-native'
import WineIcon from '@/assets/icons/WineIcon'

interface ProductFeatureProps {
  text: string;
  numberOfLines?: number;
}

export default function ProductFeature({ text, numberOfLines }: ProductFeatureProps) {
  if (!text) return null;
  return (
    <View className='flex-row items-center gap-3 w-[90%] mx-auto shadow-sm bg-white p-3 rounded-2xl border border-gray-50'>
      <View className='rounded-xl p-2.5 bg-gray-50'>
        <WineIcon size={24} color="#c9a24d" />
      </View>
      <Text 
        numberOfLines={numberOfLines}
        ellipsizeMode={numberOfLines ? "tail" : undefined}
        className='text-[15px] font-medium text-gray-700 flex-shrink pr-2'
      >
        {text}
      </Text>
    </View>
  )
}
