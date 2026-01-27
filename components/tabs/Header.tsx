import { Link, useRouter } from 'expo-router';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import ShopIcon from '@/assets/icons/ShopIcon';
import { useShop } from '@/store/useShop';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';

interface HeaderProps {
    title?: string
}

export const Header = ({ title }: HeaderProps) => {

    const { order } = useShop();

    const router = useRouter();

  return (
    <View
      className=''
    >
      <View className='pt-6 flex-row items-cente px-2 justify-between pb-2'>
        {
          title ? (
            <Text className='text-3xl font-bold text-tertiary'>
              {title}
            </Text>
          ) : (
            <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeftIcon size={28} color="black" />
            </TouchableOpacity>
          )
        }
        <View className='flex-row items-center justify-center gap-2'>
          <Link href="../shop">
            <ShopIcon color='#c9a24d' size={32} />
          </Link>
          <Text className='text-lg font-bold text-tertiary absolute top-[-8px] right-[-8px] bg-white rounded-full px-2'>{order.count}</Text>
        </View>
      </View>
    </View>
  );
};