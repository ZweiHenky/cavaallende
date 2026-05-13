import { Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { authClient } from '@/lib/auth-client'
import { OneSignal } from 'react-native-onesignal'

export default function UserCard() {
    const { data: session } = authClient.useSession()
    const router = useRouter()

    const logOut = async () => {
        await authClient.signOut()
        OneSignal.logout()
    }

    return (
        <View className='w-[95%] mx-auto flex-col items-center bg-white p-8 rounded-2xl gap-4 shadow-lg shadow-black'>
            <Text className='text-2xl text-black font-fraunces-semibold'>
                Bienvenido a Cava Allende
            </Text>
            {session ? (
                <>
                    <Text className='text-xl font-bold text-black'>{session.user.email}</Text>
                    <TouchableOpacity
                        className='bg-tertiary rounded-2xl p-4 w-full mt-4'
                        onPress={logOut}
                    >
                        <Text className='text-xl font-bold text-white text-center'>Logout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text className='text-center text-lg'>
                        Inicia sesión para acceder a tu cuenta, favoritos y pedidos
                    </Text>
                    <TouchableOpacity
                        className='bg-tertiary rounded-2xl p-4 w-full mt-4'
                        onPress={() => router.push('/auth/login')}
                    >
                        <Text className='text-xl font-bold text-white text-center'>Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}
