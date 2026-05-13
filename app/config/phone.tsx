import { View, Text, TouchableOpacity } from 'react-native'
import { ThemedView } from '@/components/ui/ThemedView'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'expo-router';
import HeaderBack from '@/components/ui/HeaderBack';

export default function Phone() {

    const router = useRouter();

    const { data: session } = authClient.useSession();



    return (
        <ThemedView>

            <HeaderBack title="Phone Number" path="../(tabs)/config" />

            {session?.user?.phoneNumber && (
                <View className='w-full mx-auto flex-col p-8 rounded-2xl gap-8 mt-4 '>
                    <View className='w-full'>
                        <Text className='text-2xl font-bold text-center text-black w-full'>Phone Number</Text>
                    </View>
                    <View className='w-full flex-row gap-2'>
                        <Text className='text-xl font-bold text-black w-1/4 text-center border border-tertiary rounded-2xl p-4'>{session.user.phoneNumber.slice(0, 3)}</Text>
                        <Text className='text-xl font-bold text-black w-3/4  border border-tertiary rounded-2xl p-4'>{session.user.phoneNumber.slice(3)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/config/newPhone')}
                        className='bg-tertiary rounded-2xl p-4 w-full mt-4'
                    >
                        <Text className='text-xl font-bold text-white text-center ' >Change Phone Number</Text>
                    </TouchableOpacity>
                </View>
            )}

        </ThemedView>
    )
}