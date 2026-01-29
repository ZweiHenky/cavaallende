import React from 'react'
import { Text, View } from 'react-native'

export default function Error({ message }: { message: string }) {
  return (
    <View className='w-full h-52 flex-row justify-center items-center px-2'>
        <Text className='text-lg text-red-500'>{message}</Text>
    </View>
  )
}