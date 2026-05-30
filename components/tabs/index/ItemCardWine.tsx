import MinusIcon from '@/assets/icons/MinusIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import { formatterCurrency } from '@/utils/formatterCurrency'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IProduct } from '@/infrastructure/interfaces/product.interface'
import { useRouter } from 'expo-router'
import { useShop } from '@/store/useShop'
import GrapesIcon from '@/assets/icons/GrapesIcon'
import CastleIcon from '@/assets/icons/CastleIcon'
import PriceTagIcon from '@/assets/icons/PriceTagIcon'
import BoxIcon from '@/assets/icons/BoxIcon'

interface itemCardWineProps {
    item: IProduct
    addProduct: (product: IProduct) => void
    image: string | undefined
}


export default function ItemCardWine({ item, addProduct, image }: itemCardWineProps) {

    const { addQuantity, removeQuantity, order } = useShop()
    const productInCart = order.products.find((p: any) => p.product.product_id === item.product_id)

    const router = useRouter()

    const watchProduct = () => {
        console.log(item)
        router.push(`/products/${item.product_id}`)
    }

    const handleAddProduct = () => {
        addProduct(item)
    }

    const handleRemoveProduct = (e: any) => {
        e.stopPropagation()
        if (productInCart?.quantity === 0) {
            return
        }
        removeQuantity(item.product_id)
    }

    const handleAddQuantity = (e: any) => {
        e.stopPropagation()
        if (productInCart?.quantity === item.stock) {
            return
        }
        addQuantity(item.product_id)
    }

  return (
    <TouchableOpacity onPress={watchProduct} activeOpacity={0.7}>
        <View className='flex-1 mx-auto flex-row w-[95%] rounded-2xl bg-white p-2 shadow-md shadow-black/20'  style={{ height: 240 }}>
<View className="w-1/3 h-full items-center justify-end overflow-visible">
  
  {/* Card */}
  <View className="w-full h-[80%] bg-white rounded-xl" />

  {/* Imagen */}
  <Image
    source={ image || require('@/assets/products/no-product-image.png') }
    style={{
      position: 'absolute',
      bottom: -120,        // 👈 CLAVE: anclada abajo
      width: '230%',    // grande
      height: '230%',   // grande
    }}
    resizeMode="contain"
  />

</View>
            <View className='flex-1 p-2 w-1/2  items-start gap-3'>
                <View className="h-[56px] justify-center">
                <Text
                    className="text-2xl text-primary font-fraunces-semibold"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                <CastleIcon size={24} color="#c9a24d" />
                <Text 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-primary  w-4/5 font-sans"
                >
                    {item.producer}
                </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                    <GrapesIcon size={24} color="#c9a24d" />
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-primary w-4/5 font-sans "
                    >
                        {item.variant}
                    </Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <PriceTagIcon size={24} color="#c9a24d" />
                    <Text className='text-xl text-primary  font-medium'>{formatterCurrency(item.price)} MXN</Text>   
                </View>
                
                <View className='flex-row items-center gap-2'>
                    <BoxIcon size={26} color="#c9a24d" />
                    <Text className='text-xl text-primary'>{item.stock} piezas</Text>   
                </View>
                {
                    productInCart && productInCart.quantity > 0 ? (
                        <View className='flex-row items-center bg-tertiary rounded-2xl px-4 py-2 w-full absolute bottom-[-30px] shadow-sm z-50'>
                            <TouchableOpacity onPress={handleRemoveProduct} className='w-1/3 items-center'>
                                <MinusIcon color='white' size={24} />
                            </TouchableOpacity>
                            <Text onPress={(e) => e.stopPropagation()} className='text-lg w-1/3 text-center font-medium text-white'>{productInCart.quantity}</Text>
                            <TouchableOpacity onPress={handleAddQuantity} className='w-1/3 items-center'>
                                <PlusIcon color='white' size={24} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity className='bg-tertiary rounded-2xl p-2 w-full absolute bottom-[-30px]' onPress={handleAddProduct}>
                            <Text className='text-lg font-medium text-white text-center '>Agregar</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    </TouchableOpacity>
  )
}
