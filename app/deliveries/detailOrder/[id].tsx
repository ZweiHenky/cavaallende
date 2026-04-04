import { ThemedView } from "@/components/ui/ThemedView";
import socket from "@/core/socket/connect";
import { useTracker } from "@/hooks/location/useTracker";
import { useGetDetailPurchase } from "@/hooks/services/purchases/useGetDetailPurchase";
import { useLocationStore } from "@/store/useLocationStore";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { CustomMarkerPin } from "@/components/maps/CustomMarkerPin";
import { DraggableBottomSheet } from "@/components/ui/DraggableBottomSheet";
import { OrderItemsList } from "@/components/orders/OrderItemsList";
import { UserIcon } from "@/assets/icons/UserIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import CreditCardIcon from "@/assets/icons/CreditCardIcon";
import { usePatchUpdateStatus } from "@/hooks/services/purchases/mutations/usePatchUpdateStatus";

const initialLocation = {
    latitude: 19.40594093690812,
    longitude: -99.17566032883565,
}

export default function DetailDelivery() {

    const { id } = useLocalSearchParams() as { id: string };

    const { data, isLoading, error } = useGetDetailPurchase(id);
    const { updateStatusMutation, isPending } = usePatchUpdateStatus();
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


    const handleCall = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleUpdateStatus = (status: string) => {
        updateStatusMutation({ id, status });
    };

    const dataOrder = data?.data;
    
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

                    {dataOrder?.created_at && (
                        <View className="flex-col gap-8 w-full">
                            <View className=" w-full mb-4 items-center">
                                <Text className="text-3xl  text-tertiary font-bold text-center" >{dataOrder?.status.toUpperCase()}</Text>
                            </View>
                            <View className="flex-row justify-between items-center w-full">
                                <View className="flex-row  items-center gap-2">
                                    <UserIcon color="#000" size={24} />
                                    <Text className="text-xl text-primary" >{dataOrder?.user_name}</Text>
                                </View>
                                <View className="flex-row  items-center gap-2 ">
                                    <CreditCardIcon color="#000" size={24} />
                                    <Text className="text-xl text-primary" >{dataOrder?.payment_method === "stripe" ? "Card" : "Cash"}</Text>
                                </View>
                            </View>
                            <View className="flex-row justify-between items-center w-full">
                                <TouchableOpacity className="bg-primary p-2 rounded-xl w-2/6  gap-2 flex items-center justify-center" onPress={() => handleCall(dataOrder?.user_phone)}>
                                    <PhoneIcon color="#fff" size={24} />
                                </TouchableOpacity>
                                <View className="flex-row  items-center gap-2 ">
                                    <Text className="text-2xl text-primary pt-2 font-bold" >{formatterCurrency(Number(dataOrder?.total))}</Text>
                                </View>
                            </View>

                            <OrderItemsList items={data?.data?.purchase_items || []} />

                            {dataOrder?.status === "accepted" && (
                                <TouchableOpacity disabled={isPending} className={`bg-primary p-4 rounded-xl w-   full  gap-2 flex items-center justify-center ${isPending ? "opacity-50" : ""}`} onPress={() => handleUpdateStatus("on_the_way")}>
                                    <Text className="text-white text-center"> {
                                        isPending 
                                        ? <ActivityIndicator color="#fff" /> 
                                        : "ON THE WAY"
                                    }</Text>
                                </TouchableOpacity>
                            )}

                            {dataOrder?.status === "on_the_way" && (
                                <TouchableOpacity disabled={isPending} className={`bg-primary p-4 rounded-xl w-   full  gap-2 flex items-center justify-center ${isPending ? "opacity-50" : ""}`} onPress={() => handleUpdateStatus("completed")}>
                                    <Text className="text-white text-center"> {
                                        isPending 
                                        ? <ActivityIndicator color="#fff" /> 
                                        : "FINISH ORDER"
                                    }</Text>
                                </TouchableOpacity>
                            )}

                        </View>
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