import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import { CustomMarkerPin } from "@/components/maps/CustomMarkerPin";
import { DraggableBottomSheet } from "@/components/ui/DraggableBottomSheet";
import { OrderItemsList } from "@/components/orders/OrderItemsList";
import { useGetDetailPurchase } from "@/hooks/services/purchases/useGetDetailPurchase";
import { useLocalSearchParams } from "expo-router";
import { formatterDate } from "@/utils/formatterDate";
import { formatterCurrency } from "@/utils/formatterCurrency";
import MapView, { Marker } from "react-native-maps";
import { useLocationStore } from "@/store/useLocationStore";
import { useEffect, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import socket from "@/core/socket/connect";
import { useTracker } from "@/hooks/location/useTracker";

const initialLocation = {
    latitude: 19.40594093690812,
    longitude: -99.17566032883565,
}

export default function DetailOrder() {
    const { id } = useLocalSearchParams() as { id: string };
    const { data, isLoading, error } = useGetDetailPurchase(id);
    const { lastKnownLocation, getLocation, watchLocation, clearWatchLocation } = useLocationStore()
    const [isTrackingWine, setIsTrackingWine] = useState(false);
    const [isTrackingHouse, setIsTrackingHouse] = useState(false);



    useTracker(lastKnownLocation, id, "clientLocation");

    const [locationDelivery, setLocationDelivery] = useState<{
        latitude:number;
        longitude:number;
    }>({
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
    });

    useEffect(() => {
        if (!lastKnownLocation) {
            getLocation()
        }
    }, [lastKnownLocation])

    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        };
    }, []);

   useEffect(() => {


    socket.on('deliveryLocation', (data: any) => {
        console.log(data);
        setLocationDelivery(data);
    });

    return () => {
        socket.off('deliveryLocation');
    };

    }, []);
    
    useEffect(() => {
        console.log(locationDelivery);
    }, [locationDelivery]);
    

    return (
        <ThemedView>
            
            {lastKnownLocation && (
            <View className="w-full h-dvh rounded-lg mb-2 mt-4 flex-1 relative">
                <MapView 
                    style={styles.map} 
                    initialRegion={{
                        latitude: lastKnownLocation?.latitude,
                        longitude: lastKnownLocation?.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09,
                }}
                showsUserLocation={true}  
                loadingEnabled={true}   
                
                >  
                
                <Marker
                    coordinate={{
                        latitude: Number(data?.data?.latitude),
                        longitude: Number(data?.data?.longitude),
                    }}
                    title="Order Location"
                    description="Order Location"
                    tracksViewChanges={!isTrackingHouse}
                >
                    <CustomMarkerPin 
                        imageSource={require("@/assets/images/maps/house-pine.png")} 
                        onLoadEnd={() => setIsTrackingHouse(true)} 
                    />
                </Marker>
                
                {
                    locationDelivery?.latitude && locationDelivery?.longitude && (
                        <Marker
                            coordinate={{
                                latitude: locationDelivery?.latitude,
                                longitude: locationDelivery?.longitude,
                            }}
                            title="Delivery Location"
                            description="Delivery Location"
                            
                            anchor={{ x: 0, y: 0.5 }}
                        >
                           <CustomMarkerPin 
                                imageSource={require("@/assets/images/maps/moto-pine.png")} 
                            />
                        </Marker>

                        
                    )
                }

                {
                    initialLocation?.latitude && initialLocation?.longitude && (
                        <Marker
                            coordinate={{
                                latitude: initialLocation.latitude,
                                longitude: initialLocation.longitude,
                            }}
                            title="Delivery Location"
                            description="Delivery Location"
                            tracksViewChanges={!isTrackingWine}
                            anchor={{ x: 0, y: 0.5 }}

                        >
                           <CustomMarkerPin 
                                imageSource={require("@/assets/images/maps/wine-pine.png")} 
                                onLoadEnd={() => setIsTrackingWine(true)} 
                            />
                        </Marker>
                    )
                }

                {/* <MapViewDirections
                    origin={{
                        latitude: lastKnownLocation?.latitude,
                        longitude: lastKnownLocation?.longitude,
                    }}
                    destination={{
                        latitude: 19.4018954,
                        longitude: -99.1666728,
                    }}
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID!}
                    strokeWidth={5}
                    strokeColor="blue"
                /> */}
                </MapView >


                <DraggableBottomSheet>
                    {isLoading && <Text>Loading...</Text>}
                    {error && <Text>Error: {error.message}</Text>}

                    {data && (
                        <>
                            <View className="flex-col justify-between items-center w-full mb-4 border-b border-gray-200 pb-2">
                                <Text className="text-2xl  text-tertiary font-bold " >{data?.data?.status.toUpperCase()}</Text>
                            </View>
                            <View className="flex-col justify-between gap-2 w-full mb-4">
                                <View className="flex-row justify-between items-center w-full">
                                    <Text className="text-xl  text-primary" > Date: </Text>
                                    <Text className="text-xl text-primary" >{formatterDate (data?.data?.created_at!)}</Text>
                                </View>
                                <View className="flex-row justify-between items-center w-full">
                                    <Text className="text-xl text-primary" > Method: </Text>
                                    <Text className="text-xl text-primary" >{data?.data?.payment_method === "stripe" ? "Card" : data?.data?.payment_method}</Text>
                                </View>
                            </View>
                            <OrderItemsList items={data?.data?.purchase_items || []} />
                            <View className="flex-col justify-between items-end w-full mt-4">
                                <View className="flex-row justify-between items-center w-full">
                                    <Text className="text-xl text-primary" > Subtotal: </Text>
                                    <Text className="text-xl text-primary" >{formatterCurrency(Number(data?.data?.subtotal))}</Text>
                                </View>
                                <View className="flex-row justify-between items-center w-full">
                                    <Text className="text-xl  text-primary" > Discount: </Text>
                                    <Text className="text-xl text-primary" >{formatterCurrency(Number(data?.data?.discount))}</Text>
                                </View>
                                <View className="flex-row justify-between items-center w-full">
                                    <Text className="text-xl font-bold text-primary" > Total: </Text>
                                    <Text className="text-xl text-primary border-t border-gray-200 pt-2 font-bold" >{formatterCurrency(Number(data?.data?.total))}</Text>
                                </View>
                            </View>
                        </>
                    )}
                </DraggableBottomSheet>

            </View>
            )}
            



        </ThemedView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});