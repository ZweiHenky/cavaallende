import WineIcon from '@/assets/icons/WineIcon'
import { formatterCurrency } from '@/utils/formatterCurrency'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IProduct } from '@/infrastructure/interfaces/product.interface'
import { useRouter } from 'expo-router'

interface itemCardWineProps {
    item: IProduct
    addProduct: (product: IProduct) => void
}



export default function ItemCardWine({ item, addProduct }: itemCardWineProps) {

    const router = useRouter()

    const watchProduct = () => {
        console.log(item)
        router.push(`/products/${item.product_id}`)
    }

  return (
    <TouchableOpacity onPress={watchProduct} activeOpacity={0.7}>
        <View className='flex-1 flex-row w-full rounded-2xl bg-white p-2 shadow-md shadow-black/20'  style={{ height: 220 }}>
            <View className='w-1/3 h-full justify-center items-center overflow-visible'>
                <Image 
                source={require('@/assets/images/vino.png')} 
                className='w-[120%] h-[140%] mt-[-40px]'
                resizeMode='cover' 
                />
            </View>
            <View className='flex-1 p-2 w-1/2  items-start gap-3'>
                <View className="h-[56px] justify-center">
                <Text
                    className="text-xl font-bold text-primary "
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {item.name}
                </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                <WineIcon size={24} color="#c9a24d" />
                <Text 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-primary  w-4/5"
                >
                    {item.producer}
                </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                <WineIcon size={24} color="#c9a24d" />
                <Text 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-primary w-4/5  "
                >
                    {item.variant}
                </Text>
                </View>
                <Text className='text-xl font-bold text-primary '>Price: {formatterCurrency(item.price)}</Text>
                <TouchableOpacity className='bg-tertiary rounded-2xl p-2 w-full absolute bottom-[-20px]' onPress={() => addProduct(item)}>
                    <Text className='text-lg font-bold text-secondary text-center '>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
  )
}
