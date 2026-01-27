import { IProduct } from '@/infrastructure/interfaces/product.interface'
import React from 'react'
import { FlatList, View } from 'react-native'
import ItemCardWine from './ItemCardWine'


interface ContainerCardWinesProps {
    data: IProduct[]
    addProduct: (product: IProduct) => void
}

export default function ContainerCardWines({ data, addProduct }: ContainerCardWinesProps) {
  return (
    <FlatList
        data={data}
        renderItem={({ item }: { item: IProduct }) => (
          <ItemCardWine item={item} addProduct={addProduct} />
        )}
        ListHeaderComponent={<View className='h-8' />}
        ItemSeparatorComponent={() => <View className='h-12' />}
        style={{
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className='h-28' />}
      />
  )
}
