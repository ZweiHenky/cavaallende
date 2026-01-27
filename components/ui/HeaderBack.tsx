import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from 'expo-router';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';

export default function HeaderBack({ title }: { title?: string }) {

    const navigate = useNavigation();

  return (
    <View className='flex-row items-center px-2 py-4 gap-2 w-full  justify-between'>
        <TouchableOpacity onPress={() => navigate.goBack()}>
            <ArrowLeftIcon size={28} color="black" />
        </TouchableOpacity>
        <Text className='text-xl font-bold text-black '>{title}</Text>
    </View>
  )
}
