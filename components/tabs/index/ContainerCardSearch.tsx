import { IProduct } from '@/infrastructure/interfaces/product.interface'
import React from 'react'
import { FlatList, View } from 'react-native'
import ItemCardWine from './ItemCardWine'
import { useGetProductByName } from '@/hooks/services/products/useGetProductByName'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'


interface ContainerCardSearchProps {
    addProduct: (product: IProduct) => void
    selectedType: number | null
    debounceSearchText: string
}

export default function ContainerCardSearch({ addProduct, selectedType, debounceSearchText }: ContainerCardSearchProps) {
  
   const { data, isLoading, error } = useGetProductByName(debounceSearchText, selectedType);


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
