import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Loading() {
  return (
    <View className='w-full h-52 flex-row justify-center items-center px-2'>
        <ActivityIndicator size="large" color="#c9a24d" />
    </View>
  )
}
