import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';


interface HeaderBackProps {
  title?: string;
  path?: RelativePathString | ExternalPathString;
}

export default function HeaderBack({ title, path }: HeaderBackProps) {

  const router = useRouter();

  const handleBack = () => {
    if (path) {
      router.replace(path);
    } else {
      router.back();
    }
  }

  return (
    <View className='flex-row items-center px-2 py-4 gap-2 w-full  justify-between'>
        <TouchableOpacity onPress={handleBack} className='w-1/12'>
            <ArrowLeftIcon size={28} color="black" />
        </TouchableOpacity>
        <Text className='text-xl text-black font-fraunces-semibold' >{title}</Text>
    </View>
  )
}
