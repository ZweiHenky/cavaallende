import { Link } from 'expo-router';
import React from 'react'
import { Text, View } from 'react-native';
import ShopIcon from '@/assets/icons/ShopIcon';
import { useShop } from '@/store/useShop';

export const Header = () => {

    const { order } = useShop();

  return (
    <View
      className=''
    >
      <View className='pt-6 flex-row items-cente px-2 justify-between'>
        <Text className='text-3xl font-bold text-tertiary'>
          Cava Allende
        </Text>
        <View className='flex-row items-center justify-center gap-2'>
          <Link href="../shop">
            <ShopIcon color='#4F6F5D' size={32} />
          </Link>
          <Text className='text-lg font-bold text-tertiary absolute top-[-8px] right-[-8px] bg-white rounded-full px-2'>{order.count}</Text>
        </View>
      </View>
    </View>
  );
};