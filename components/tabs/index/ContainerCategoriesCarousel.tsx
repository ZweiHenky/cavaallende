import React from 'react'
import {useWindowDimensions, View } from 'react-native'
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import ItemCarousel from './ItemCarousel';
import { useGetAllCategories } from "@/hooks/services/useGetAllCategories";
import { Category } from '@/infrastructure/interfaces/category.interface';
import { useCategory } from '@/store/useCategory';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

export default function ContainerCategoriesCarousel() {

    const { data, isLoading, error } = useGetAllCategories()

    const { setCategoryActive} = useCategory()

    const window = useWindowDimensions().width;
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue(0);

    const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		});
	};

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error message='Error al cargar las categorías' />
    }
  
  return (
    <View className='w-full '>
        <Carousel
            ref={ref}
            // autoPlayInterval={2000}
            data={data || []}
            loop={true}
            // pagingEnabled={true}
            // snapEnabled={true}
            mode="parallax"
            width={window - 40}
            containerStyle={{
                backgroundColor: "transparent",
                width: "100%",
                paddingBottom: 20,
                justifyContent: "center",
                alignItems: "center",
            }}
            height={150}
            modeConfig={{
                parallaxScrollingScale: 1.05,
                parallaxScrollingOffset: 0,
            }}
            onProgressChange={(offsetProgress, absoluteProgress) => {
                progress.value = absoluteProgress;
            }}
            onSnapToItem={(index) => {
                setCategoryActive(data![index].id)
            }}
            renderItem={({ item }: { item: Category }) => (
                <ItemCarousel item={item} />
            )}
        />
        <Pagination.Basic
            progress={progress}
            data={data || []}
            size={15}
            dotStyle={{
                borderRadius: 100,
                backgroundColor: "#5a0f1b",
            }}
            activeDotStyle={{
                borderRadius: 100,
                overflow: "hidden",
                backgroundColor: "#c9a24d",
            }}
            containerStyle={[
                {
                    gap: 10,
                    marginBottom: 10,
                },
            ]}
            horizontal
            onPress={onPressPagination}
        />
    </View>
  )
}
