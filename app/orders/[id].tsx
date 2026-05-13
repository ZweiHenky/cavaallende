import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import { CustomMarkerPin } from "@/components/maps/CustomMarkerPin";
import { DraggableBottomSheet } from "@/components/ui/DraggableBottomSheet";
import { OrderItemsList } from "@/components/orders/OrderItemsList";
import { useGetDetailPurchase } from "@/hooks/services/purchases/useGetDetailPurchase";
import { router, useLocalSearchParams } from "expo-router";
import { formatterCurrency } from "@/utils/formatterCurrency";
import MapView, { Marker } from "react-native-maps";
import { useLocationStore } from "@/store/useLocationStore";
import { useEffect, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import socket from "@/core/socket/connect";
import { useTracker } from "@/hooks/location/useTracker";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import CreditCardIcon from "@/assets/icons/CreditCardIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import { usePatchUpdateStatus } from "@/hooks/services/purchases/mutations/usePatchUpdateStatus";
import { useChangeStatus } from "@/hooks/sockets/purchases/useChangeStatus";
import { useImages } from "@/store/useImages";

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
    const { updateStatusMutation, isPending } = usePatchUpdateStatus();
    const { images } = useImages();


    useTracker(lastKnownLocation, id, "clientLocation");

    // socket update status
    useChangeStatus();

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
        if (data?.data?.status === "cancelled" || data?.data?.status === "completed") {
            setTimeout(() => {
                router.replace({
                    pathname: "/orders/orderResume/[idResume]",
                    params: {
                        idResume: id,
                    },
                });
            }, 5000);
        }
    }, [data?.data?.status]);
    
    
    const handleCall = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };
        
    const handleUpdateStatus = () => {
        updateStatusMutation({
            id: id,
            status: "cancelled",
        });
    };

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
                        imageSource={require("@/assets/images/maps/home.png")} 
                        
                    />
                </Marker>
                
                {
                    locationDelivery?.latitude && locationDelivery?.longitude &&  (
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
                                imageSource={require("@/assets/images/maps/motorcycle.png")} 
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
                            anchor={{ x: 0, y: 1.5 }}

                        >
                           <CustomMarkerPin 
                                imageSource={require("@/assets/images/maps/wine.png")} 
                                
                            />
                        </Marker>
                    )
                }

                {
                    locationDelivery?.latitude && locationDelivery?.longitude && 
                    data?.data?.latitude && data?.data?.longitude && (
                        <MapViewDirections
                            origin={{
                                latitude: locationDelivery?.latitude!,
                                longitude: locationDelivery?.longitude!,
                            }}
                            destination={{
                                latitude: Number(data?.data?.latitude!),
                                longitude: Number(data?.data?.longitude!),
                            }}
                            apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID!}
                            strokeWidth={5}
                            strokeColor="blue"
                            
                        />
                    )
                }
                </MapView >


                <DraggableBottomSheet>
                    {isLoading && <Text>Loading...</Text>}
                    {error && <Text>Error: {error.message}</Text>}

                    {data && (
                        <View className="flex-col gap-10 w-full">
                            <View className=" w-full mb-1 items-center">
                                <Text className="text-3xl  text-tertiary font-bold text-center" >{data?.data?.status.toUpperCase()}</Text>
                            </View>
                            <View className="flex-row justify-center gap-4 items-center w-full border border-tertiary p-2 rounded-xl">
                                {
                                    data.data.secure_code.split('').map((letter, index) => (
                                        <Text key={index} className="text-3xl text-primary font-bold" >{letter}</Text>
                                    ))
                                }
                            </View>
                            
                            <View className="flex-row justify-between items-center w-full">
                                <View className="flex-row  items-center gap-2">
                                    <UserIcon color="#000" size={24} />
                                    <Text className="text-xl text-primary" >{data?.data?.delivery_name || 'No delivery assigned'}</Text>
                                </View>
                                <View className="flex-row  items-center gap-2 ">
                                    <CreditCardIcon color="#000" size={24} />
                                    <Text className="text-xl text-primary" >{data?.data?.payment_method === "stripe" ? "Card" : "Cash"}</Text>
                                </View>
                            </View>
                            <View className="flex-row justify-between items-center w-full">
                                <TouchableOpacity className="bg-primary p-2 rounded-xl w-2/6  gap-2 flex items-center justify-center" onPress={() => handleCall(data?.data?.delivery_phone!)}>
                                    <PhoneIcon color="#fff" size={24} />
                                </TouchableOpacity>
                                <View className="flex-row  items-center gap-2 ">
                                    <Text className="text-2xl text-primary pt-2 font-bold" >{formatterCurrency(Number(data?.data?.total))}</Text>
                                </View>
                            </View>

                            <OrderItemsList items={data?.data?.purchase_items || []} /> 

                            
                                {
                                    data?.data?.status === "accepted" || data?.data?.status === "paid" ? (
                                        <View className="flex-row justify-between items-center w-full mt-4 border-t border-gray-200 pt-4">
                                            <View className="flex-col justify-between items-center w-full gap-4">
                                                <Text className="text-2xl text-primary pt-2 font-bold" >Cancel Order</Text>
                                                <Text className="text-sm text-primary pt-2" >You can cancel the order if the status is &apos;accepted&apos; or &apos;paid&apos;, if the status is &apos;on the way&apos; you can&apos;t cancel the order</Text>
                                                <TouchableOpacity className="bg-primary p-4 rounded-xl w-full flex items-center justify-center" onPress={() => handleUpdateStatus()}>
                                                    <Text className="text-xl text-white font-bold" >Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>                                      
                                    ) : ''
                                }

                        </View>
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