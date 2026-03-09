import MinusIcon from "@/assets/icons/MinusIcon"
import PlusIcon from "@/assets/icons/PlusIcon"
import TrashIcon from "@/assets/icons/TrashIcon"
import { IProduct } from "@/infrastructure/interfaces/product.interface"
import { useShop } from "@/store/useShop"
import { formatterCurrency } from "@/utils/formatterCurrency"
import { Image, Text, TouchableOpacity, View } from "react-native"


interface ItemProps {
  product: IProduct;
  quantity: number;
}

export default function ItemShop({ item }: { item: ItemProps }) {

        const { removeProduct, addQuantity, removeQuantity } = useShop();

      return(
      <View className='w-[95%] mx-auto bg-white rounded-2xl py-4 px-4 flex-row min-h-38'>
        <Image
          source={require('@/assets/images/vino.png')}
          className='w-32 h-32'
        />

        <View className='flex-1 flex-row justify-between h-full'>
          <View className='w-full'>
            <View className='w-full flex-row  justify-between'>
              <Text className='text-xl w-4/5 font-bold text-black'>
                {item.product.name}
              </Text>
              <TouchableOpacity onPress={() => removeProduct(Number(item.product.product_id))}>
                <TrashIcon color='#c9a24d' size={28} /> 
              </TouchableOpacity>
            </View>

            <View className='w-full flex-row justify-between items-end flex-1'>
              <View className='flex-row items-center gap-4 bg-tertiary rounded-full px-2 py-2'>
                <TouchableOpacity onPress={() => removeQuantity(Number(item.product.product_id))}>
                  <MinusIcon color='white' size={24} />
                </TouchableOpacity>
                <Text className='text-white text-lg'>{item.quantity}</Text>
                <TouchableOpacity onPress={() => addQuantity(Number(item.product.product_id))}>
                  <PlusIcon color='white' size={24} />
                </TouchableOpacity>
              </View>
              {
                item.quantity >= 2 ? (
                  <View>
                    <Text className='text-xl font-bold text-black'>{formatterCurrency(item.product.price * item.quantity)}</Text>
                    <Text className='text-lg text-slate-400'>{formatterCurrency(item.product.price) + ' c/u'}</Text>
                  </View>
                ) : (
                  <Text className='text-xl font-bold text-black'>{formatterCurrency(item.product.price)}</Text>
                )
              }
            </View>
            
          </View>


        </View>
      </View>
      )
    }