import React from 'react'
import { ThemedView } from '@/components/ui/ThemedView'
import { ScrollView, Text } from 'react-native'
import { Header } from '@/components/tabs/Header'
import { useLocalSearchParams } from 'expo-router'
import { useGetProductById } from '@/hooks/services/products/useGetProductById'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ProductHero from '@/components/products/ProductHero'
import ProductFeature from '@/components/products/ProductFeature'
import NoseIcon from '@/assets/icons/NoseIcon'
import EyeIcon from '@/assets/icons/EyeIcon'
import TongueIcon from '@/assets/icons/TongueIcon'

export default function DetailsProduct() {
  const { id } = useLocalSearchParams()
  const { data, isLoading, error } = useGetProductById(Number(id))

  if (isLoading) {
    return (
      <ThemedView>
        <Header  />
        <ScrollView  
          contentContainerStyle={{
            flexGrow: 1,
            gap: 16,
            paddingBottom: 20
          }}
          showsVerticalScrollIndicator={false}
        >
          <Loading />
        </ScrollView>
      </ThemedView>
    )
  }

  if (error || !data) {
    return (
      <ThemedView>
        <Header  />
        <ScrollView  
          contentContainerStyle={{
            flexGrow: 1,
            gap: 16,
            paddingBottom: 20
          }}
          showsVerticalScrollIndicator={false}
        >
          <Error message='Error al cargar el producto' />
        </ScrollView>
      </ThemedView>
    )
  }

  return (
    <ThemedView>
      <Header />
      <ScrollView  
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          paddingBottom: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProductHero data={data} />

        <Text className='text-3xl p-2 text-secondary font-fraunces-semibold' >
          Características
        </Text>

        {data.variant && <ProductFeature text={data.variant} numberOfLines={3} type='grapes' />}
        {data.fermentation && <ProductFeature text={data.fermentation} numberOfLines={3} type='barrel' />}
        {data.vintages && <ProductFeature text={data.vintages} numberOfLines={3} type='calendar' />}
        {data.temperature && <ProductFeature text={data.temperature} numberOfLines={3} type='thermo-control' />}

        <Text className='text-3xl p-2 text-secondary font-fraunces-semibold' >
          Descripción
        </Text>

        {data.noise && <ProductFeature type='nose' text={data.noise} /> }
        {data.view && <ProductFeature type='eye' text={data.view} />}
        {data.mouth && <ProductFeature type='mouth' text={data.mouth} />}

        <Text className='text-3xl p-2 text-secondary font-fraunces-semibold' >
          Recomendación
        </Text>

        {data.recomendation && <ProductFeature text={data.recomendation} type='like' />}

      </ScrollView>
    </ThemedView>
  )
}
