import { Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { authClient } from '@/lib/auth-client'
import LanguageIcon from '@/assets/icons/LanguageIcon'
import LocationIcon from '@/assets/icons/LocationIcon'
import PhoneIcon from '@/assets/icons/PhoneIcon'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon'
import { useLocationStore } from '@/store/useLocationStore'

export default function PreferencesCard() {
    const { data: session } = authClient.useSession()
    const router = useRouter()
    const { address } = useLocationStore()

    return (
        <View className='w-[95%] mx-auto flex-col items-center bg-white p-8 rounded-2xl gap-4 mt-4 shadow-lg shadow-black'>
            <Text className='text-2xl text-black font-fraunces-semibold'>Preferencias</Text>
            <View className='flex-col gap-4 w-full'>

                {/* Idioma */}
                <View className='flex-row items-center justify-between gap-4 w-full'>
                    <View className='flex-row items-center gap-4'>
                        <View className='border border-tertiary rounded-2xl p-4'>
                            <LanguageIcon color='#c9a24d' size={28} />
                        </View>
                        <View>
                            <Text>Idioma</Text>
                            <Text>Español</Text>
                        </View>
                    </View>
                    <ChevronRightIcon color='#4F6F5D50' size={28} />
                </View>

                {/* Teléfono — solo si hay sesión */}
                {session?.user.id && (
                    <TouchableOpacity
                        onPress={() =>
                            session?.user?.phoneNumber
                                ? router.push('/config/phone')
                                : router.push('/config/newPhone')
                        }
                        className='flex-row items-center justify-between gap-4 w-full'
                    >
                        <View className='flex-row items-center gap-4'>
                            <View className='border border-tertiary rounded-2xl p-4'>
                                <PhoneIcon color='#c9a24d' size={28} />
                            </View>
                            <View className='w-3/5'>
                                <Text className='text-black'>Número de teléfono</Text>
                                <Text
                                    numberOfLines={session?.user?.phoneNumber ? 1 : 2}
                                    ellipsizeMode='tail'
                                    className={`w-full ${session?.user?.phoneNumber ? 'text-black' : 'text-red-500'}`}
                                >
                                    {session?.user?.phoneNumber || 'Agregar número de teléfono'}
                                </Text>
                            </View>
                            <ChevronRightIcon
                                color={session?.user?.phoneNumber ? '#4F6F5D50' : '#5a0f1b'}
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                )}

                {/* Ubicación */}
                <TouchableOpacity
                    onPress={() => router.push('/config')}
                    className='flex-row items-center justify-between gap-4 w-full'
                >
                    <View className='flex-row items-center gap-4'>
                        <View className='border border-tertiary rounded-2xl p-4'>
                            <LocationIcon color='#c9a24d' size={28} />
                        </View>
                        <View className='w-3/5'>
                            <Text>Ubicación</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                className='w-full'
                            >
                                {address?.formattedAddress}
                            </Text>
                        </View>
                        <ChevronRightIcon color='#4F6F5D50' size={28} />
                    </View>
                </TouchableOpacity>

                {/* Cuenta de repartidor */}
                {session?.user.role === 'delivery' && (
                    <TouchableOpacity
                        onPress={() => router.push('/deliveries/config/accountStripe')}
                        className='flex-row items-center justify-between gap-4 w-full'
                    >
                        <View className='flex-row items-center gap-4'>
                            <View className='border border-tertiary rounded-2xl p-4'>
                                <PhoneIcon color='#c9a24d' size={28} />
                            </View>
                            <View className='w-3/5'>
                                <Text className='text-black'>Cuenta de repartidor</Text>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    className='w-full'
                                >
                                    {'Configurar cuenta de repartidor'}
                                </Text>
                            </View>
                            <ChevronRightIcon color='#4F6F5D50' size={28} />
                        </View>
                    </TouchableOpacity>
                )}

            </View>
        </View>
    )
}
