import Error from "@/components/ui/Error";
import HeaderBack from "@/components/ui/HeaderBack";
import Loading from "@/components/ui/Loading";
import { ThemedView } from "@/components/ui/ThemedView";
import { useUserLocation } from "@/hooks/config/useUserLocation";
import { Text, Button, View, TouchableOpacity } from "react-native";

export default function Index() {

    const { location, address, loading, error, refreshLocation } = useUserLocation();

    if (loading) {
        return <ThemedView>
            <HeaderBack title="Location"  />
            <Loading />
        </ThemedView>
    }

    if (error) {
        return <ThemedView>
            <HeaderBack title="Location"  />
            <Error message={error} />
        </ThemedView>   
    }

    const {
        region,
        city,
        district,
        street,
        country,
        streetNumber
    } = address ?? {};

    return (
        <ThemedView>
            <HeaderBack title="Location"  />
            <View className="flex-1 px-4 mt-6">
                <View className="bg-black/5 dark:bg-white/5 rounded-3xl p-5 mb-8">
                    <View className="flex-row justify-between items-center py-3 border-b border-black/10 dark:border-white/10">
                        <Text className="text-base font-semibold opacity-60">Region</Text>
                        <Text className="text-tertiary text-lg font-bold flex-1 text-right ml-4">{region || '-'}</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3 border-b border-black/10 dark:border-white/10">
                        <Text className="text-base font-semibold opacity-60">City</Text>
                        <Text className="text-tertiary text-lg font-bold flex-1 text-right ml-4">{city || '-'}</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3 border-b border-black/10 dark:border-white/10">
                        <Text className="text-base font-semibold opacity-60">District</Text>
                        <Text className="text-tertiary text-lg font-bold flex-1 text-right ml-4">{district || '-'}</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3 border-b border-black/10 dark:border-white/10">
                        <Text className="text-base font-semibold opacity-60">Street</Text>
                        <Text className="text-tertiary text-lg font-bold flex-1 text-right ml-4">{street || '-'}</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3 border-b border-black/10 dark:border-white/10">
                        <Text className="text-base font-semibold opacity-60">Country</Text>
                        <Text className="text-tertiary text-lg font-bold flex-1 text-right ml-4">{country || '-'}</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3">
                        <Text className="text-base font-semibold opacity-60">Street Number</Text>
                        <Text className="text-tertiary text-lg font-bold flex-1 text-right ml-4">{streetNumber || '-'}</Text>
                    </View>
                </View>
                    
                <TouchableOpacity
                    onPress={refreshLocation}
                    className="bg-tertiary rounded-xl py-4 px-6"
                >
                    <Text className="text-white text-lg font-bold text-center">Refresh Location</Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    )
}
