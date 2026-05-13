import { IProduct } from '@/infrastructure/interfaces/product.interface'
import React from 'react'
import { FlatList, View } from 'react-native'
import ItemCardWine from './ItemCardWine'
import { useGetProductsByCategory } from '@/hooks/services/products/useGetProductsByCategory'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'


interface ContainerCardWinesProps {
    addProduct: (product: IProduct) => void
    categoryActive: number | null
    selectedType: number | null
}

export default function ContainerCardWines({ addProduct, categoryActive, selectedType }: ContainerCardWinesProps) {
  
  const category = categoryActive || 1

  const { data, isLoading, error } = useGetProductsByCategory(category, selectedType)

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (error || !data) {
    return (
      <Error message='Error al cargar los productos' />
    )
  }

  if (data?.data.products.length === 0) {
    return (
      <Error message='No se encontraron productos' />
    )
  }

  return (
    <FlatList
        data={data?.data.products}
        renderItem={({ item }: { item: IProduct }) => (
          <ItemCardWine item={item} addProduct={addProduct} />
        )}
        ListHeaderComponent={<View className='h-12' />}
        ItemSeparatorComponent={() => <View className='h-24' />}
        style={{
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className='h-28' />}
      />
  )
}
