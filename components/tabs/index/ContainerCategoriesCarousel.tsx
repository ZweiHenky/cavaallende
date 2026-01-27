import React from 'react'
import { Dimensions, Text, useWindowDimensions, View } from 'react-native'
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import ItemCarousel from './ItemCarousel';

export default function ContainerCategoriesCarousel() {

    // const progress = useSharedValue(0);
    const categories = [
	    "Vinos de la semana",
	    "Vinos de ocasión", 
        "Mejores vinos",
        "Recomendacion del sommelier",
        "Vinos mexicanos",
        "Vinos organicos/biodinamicos/naturales",
    ]; 
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
  
  return (
    <View className='w-full '>
        <Carousel
            ref={ref}
            // autoPlayInterval={2000}
            data={categories}
            loop={true}
            // pagingEnabled={true}
            // snapEnabled={true}
            mode="parallax"
            width={window - 30}
            containerStyle={{
                backgroundColor: "transparent",
                width: "100%",
                paddingBottom: 10,
                justifyContent: "center",
                alignItems: "center",
            }}
            height={150}
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 70,
            }}
            onProgressChange={(offsetProgress, absoluteProgress) => {
                progress.value = absoluteProgress;
            }}
            renderItem={({ item }) => (
                <ItemCarousel item={item} />
            )}
        />
        <Pagination.Basic
            progress={progress}
            data={categories}
            size={20}
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
                    gap: 5,
                    marginBottom: 10,
                },
            ]}
            horizontal
            onPress={onPressPagination}
        />
    </View>
  )
}
