import { ThemedView } from "@/components/ui/ThemedView";
import socket from "@/core/socket/connect";
import { useTracker } from "@/hooks/location/useTracker";
import { useGetDetailPurchase } from "@/hooks/services/purchases/useGetDetailPurchase";
import { useLocationStore } from "@/store/useLocationStore";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { formatterDate } from "@/utils/formatterDate";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { CustomMarkerPin } from "@/components/maps/CustomMarkerPin";
import { DraggableBottomSheet } from "@/components/ui/DraggableBottomSheet";
import { OrderItemsList } from "@/components/orders/OrderItemsList";

const initialLocation = {
    latitude: 19.40594093690812,
    longitude: -99.17566032883565,
}

export default function DetailDelivery() {

    const { id } = useLocalSearchParams() as { id: string };

    const { data, isLoading, error } = useGetDetailPurchase(id);
    const { lastKnownLocation, getLocation, watchLocation, clearWatchLocation } = useLocationStore()

    const [isTrackingHouse, setIsTrackingHouse] = useState(false);
    const [isTrackingWine, setIsTrackingWine] = useState(false);

    useTracker(lastKnownLocation, id, "deliveryLocation");

    const [localtionClient, setLocationClient] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({
        latitude: null,
        longitude: null,
    });

    const [locationOrder, setLocationOrder] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({
        latitude: null,
        longitude: null,
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
        
        socket.on('clientLocation', (data: any) => {
            setLocationClient(data);
        });

        return () => {
            socket.off('clientLocation');
        };

    }, []);

    useEffect(() => {
        if (data?.data?.latitude && data?.data?.longitude) {
            setLocationOrder({
                latitude: Number(data?.data?.latitude),
                longitude: Number(data?.data?.longitude),
            }); 
        }
    }, [data]);

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
                
                {
                    localtionClient?.latitude && localtionClient?.longitude && (
                        <Marker
                            coordinate={{
                                latitude: localtionClient?.latitude,
                                longitude: localtionClient?.longitude,
                            }}
                            title="Delivery Location"
                            description="Delivery Location"
                            pinColor="green"
                        />
                    )
                }
                {
                    locationOrder?.latitude && locationOrder?.longitude && (
                        <Marker
                            coordinate={{
                                latitude: locationOrder?.latitude,
                                longitude: locationOrder?.longitude,
                            }}
                            title="Order Location"
                            description="Order Location"
                            tracksViewChanges={!isTrackingHouse}
                            anchor={{ x: 0, y: 0.5 }}
                        >
                           <CustomMarkerPin 
                                imageSource={require("@/assets/images/maps/house-pine.png")} 
                                onLoadEnd={() => setIsTrackingHouse(true)} 
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

                    {data?.data?.created_at && (
                        <>
                        <View className="flex-row justify-between items-center w-full mb-4">
                            <Text className="text-xl  text-primary" > Order ID: {data?.data?.purchase_id}</Text>
                            <Text className="text-xl  text-tertiary font-bold " >{data?.data?.status.toUpperCase()}</Text>
                        </View>
                        <View className="flex-col justify-between gap-2 w-full mb-4">
                            <View className="flex-row justify-between items-center w-full">
                                <Text className="text-xl  text-primary" > Date: </Text>
                                <Text className="text-xl text-primary" >{formatterDate (data?.data?.created_at!)}</Text>
                            </View>
                            <View className="flex-row justify-between items-center w-full">
                                <Text className="text-xl text-primary" > Method: </Text>
                                <Text className="text-xl text-primary" >{data?.data?.payment_method === "stripe" ? "Card" : "Cash"}</Text>
                            </View>
                        </View>
                        <OrderItemsList items={data?.data?.purchase_items || []} />
                        <View className="flex-col justify-between items-end w-full mt-4">
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
    );
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