import { ThemedView } from "@/components/ui/ThemedView";
import { useEffect, useState } from "react";
import { Switch, View, Platform, Text } from "react-native";
import { OneSignal, UserChangedState } from "react-native-onesignal";
import { useNotificationStore } from "@/store/useNotification";
import HeaderBack from "@/components/ui/HeaderBack";
import BellIcon from "@/assets/icons/BellIcon";
import { authClient } from "@/lib/auth-client";

export default function Notify() {
    const [userId, setUserId] = useState<string | null>(null);
    const { statusNotification, setStatusNotification } = useNotificationStore();
    const {data:session} = authClient.useSession();

    useEffect(() => {
        OneSignal.User.getExternalId().then((id: string | null) => {
            setUserId(id);
        });
    }, []);

    const handleToggleNotification = () => {
        if (!statusNotification) {
            OneSignal.login(session?.user?.id!);
            setStatusNotification(true);
            return;
        }
        OneSignal.logout();
        setStatusNotification(false);
    };

    useEffect(() => {

        const listener = (event: UserChangedState) => { 
            console.log(event);
            console.log(statusNotification);
            if(!statusNotification && event.current.externalId){
                setUserId(session?.user?.id || null);
            }else{
                setUserId(null);
            }
        };

        OneSignal.User.addEventListener('change', listener);

        return () => {
            OneSignal.User.removeEventListener('change', listener);
        }
    }, [])

    return (
        <ThemedView>
            <HeaderBack title="Notificaciones" />
            
            <View className="flex-1 px-4 pt-6">
                <View className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1 pr-4">
                        <View className="bg-neutral-100 p-3 rounded-full mr-4">
                            <BellIcon size={24} color={'#171717'} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-textColor font-bold">Notificaciones Push</Text>
                            <Text className="text-neutral-500 text-xs mt-1 leading-tight">
                                Recibe actualizaciones sobre el estado de tus pedidos y promociones.
                            </Text>
                        </View>
                    </View>
                    
                    <Switch
                        trackColor={{ false: "#d4d4d8", true: "#3B82F6" }}
                        thumbColor={Platform.OS === 'ios' ? "#FFFFFF" : "#f4f3f4"}
                        ios_backgroundColor="#d4d4d8"
                        onValueChange={handleToggleNotification}
                        value={statusNotification}
                    />
                </View>
{/* 
                {userId && (
                    <View className="mt-8">
                        <Text className="mb-2 text-xs text-neutral-500 uppercase tracking-widest ml-1">
                            Información de Depuración
                        </Text>
                        <View className="bg-neutral-100 rounded-xl p-4 border border-neutral-200">
                            <Text className="text-xs text-neutral-500 mb-1">ID de Dispositivo (OneSignal)</Text>
                            <Text className="text-sm font-mono text-neutral-700">
                                {userId}
                            </Text>
                        </View>
                    </View>
                )} */}
            </View>
        </ThemedView>
    );
}