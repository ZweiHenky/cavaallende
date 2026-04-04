import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { RelativePathString, useRouter } from 'expo-router';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';

interface HeaderRouteProps {
    title?: string;
    route: RelativePathString;
}

export default function HeaderRoute({ title, route }: HeaderRouteProps) {

    const router = useRouter();

  return (
    <View className='flex-row items-center px-2 py-4 gap-2 w-full  justify-between'>
        <TouchableOpacity onPress={() => router.push(route)}>
            <ArrowLeftIcon size={28} color="black" />
        </TouchableOpacity>
        {title && <Text className='text-xl font-bold text-black '>{title}</Text>}
    </View>
  )
}
