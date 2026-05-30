import React from 'react'
import { Image, Text, View } from 'react-native'
import { Category } from '@/infrastructure/interfaces/category.interface'

export default function ItemCarousel({item}: {item: Category}) {

    const images: Record<string, any> = {
        organic: require('@/assets/images/categories/organic.png'),
        love: require('@/assets/images/categories/love.png'),
        mexican: require('@/assets/images/categories/mexican.png'),
        semana: require('@/assets/images/categories/semana.jpg'),
        sommelier: require('@/assets/images/categories/sommelier.png'),
        destilados: require('@/assets/images/categories/destilados.png'),
    }

    const getName = (name: string) => {
        switch (name) {
            case 'vinos orgánicos, biodinámicos, naturales':
                return 'organic'
            case 'celebración y conquista':
                return 'love'
            case 'vinos mexicanos':
                return 'mexican'
            case 'vino de la semana':
                return 'semana'
            case 'recomendación del sommelier':
                return 'sommelier'
            case 'destilados':
                return 'destilados'
            default:
                return name
        }
    }

  return (
    <View className='flex-1 items-center justify-center w-[90%] mx-6 px-2 bg-transparent'>
        <View className='w-full h-full rounded-2xl absolute top-0  bottom-0'>
            <Image
            source={images[getName(item.name)] as any}
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
