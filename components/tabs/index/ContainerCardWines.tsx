import { IProduct } from '@/infrastructure/interfaces/product.interface'
import React, { useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import ItemCardWine from './ItemCardWine'
import { useGetProductsByCategory } from '@/hooks/services/products/useGetProductsByCategory'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { useImages } from '@/store/useImages'
import { usePullToRefresh } from '@/hooks/refresh/usePullToRefresh'


interface ContainerCardWinesProps {
    addProduct: (product: IProduct) => void
    categoryActive: number | null
    selectedType: number | null
}

export default function ContainerCardWines({ addProduct, categoryActive, selectedType }: ContainerCardWinesProps) {
  
  const category = categoryActive || 1

  const { data, isLoading, error, refetch } = useGetProductsByCategory(category, selectedType)
  const { images, getImage } = useImages();
  
  const { loadingRefresh, pullToRefresh } = usePullToRefresh(refetch);

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
        refreshControl={
          <RefreshControl refreshing={loadingRefresh} onRefresh={pullToRefresh} />
        }
        data={data?.data.products}
        renderItem={({ item }: { item: IProduct }) => {
          const imageProduct = getImage(item.image);
          return (
            <ItemCardWine item={item} addProduct={addProduct} image={imageProduct} />
          )
        }}
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
