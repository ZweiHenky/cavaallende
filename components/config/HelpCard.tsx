import { Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import InboxBoxIcon from '@/assets/icons/InboxBoxIcon'
import HelpIcon from '@/assets/icons/HelpIcon'
import DocumentIcon from '@/assets/icons/DocumentIcon'
import ShieldIcon from '@/assets/icons/ShieldIcon'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon'
import { authClient } from '@/lib/auth-client'

interface HelpCardProps {
    showDeliveryOption?: boolean
}

export default function HelpCard({ showDeliveryOption = true }: HelpCardProps) {
    const { data: session } = authClient.useSession()
    const router = useRouter()

    return (
        <View className='w-[95%] mx-auto flex-col items-center bg-white p-8 rounded-2xl gap-4 mt-4 shadow-lg shadow-black'>
            <Text className='text-2xl text-black font-fraunces-semibold'>Ayuda</Text>
            <Text className='text-lg text-center'>
                Si tienes alguna pregunta o problema, no dudes en contactarnos
            </Text>

            {/* Conviértete en repartidor — oculto si showDeliveryOption=false */}
            {showDeliveryOption && session?.user.role === 'user' && (
                <TouchableOpacity className='flex-row items-center justify-between gap-4 w-full' onPress={() => router.push('/config/newDelivery')}>
                    <View className='flex-row items-center gap-4'>
                        <View className='border border-tertiary rounded-2xl p-4'>
                            <InboxBoxIcon color='#c9a24d' size={28} />
                        </View>
                        <View>
                            <Text>Conviertete en repartidor</Text>
                        </View>
                    </View>
                    <ChevronRightIcon color='#4F6F5D50' size={28} />
                </TouchableOpacity>
            )}

            {/* Centro de ayuda */}
            <View className='flex-row items-center justify-between gap-4 w-full'>
                <View className='flex-row items-center gap-4'>
                    <View className='border border-tertiary rounded-2xl p-4'>
                        <HelpIcon color='#c9a24d' size={28} />
                    </View>
                    <View>
                        <Text>Centro de ayuda</Text>
                    </View>
                </View>
                <ChevronRightIcon color='#4F6F5D50' size={28} />
            </View>

            {/* Términos y condiciones */}
            <TouchableOpacity
                onPress={() => router.push('/config/termOfUse')}
                className='flex-row items-center justify-between gap-4 w-full'
            >
                <View className='flex-row items-center gap-4'>
                    <View className='border border-tertiary rounded-2xl p-4'>
                        <DocumentIcon color='#c9a24d' size={28} />
                    </View>
                    <View>
                        <Text>Terminos y condiciones</Text>
                    </View>
                </View>
                <ChevronRightIcon color='#4F6F5D50' size={28} />
            </TouchableOpacity>

            {/* Política de privacidad */}
            <TouchableOpacity
                onPress={() => router.push('/config/privacyPolicy')}
                className='flex-row items-center justify-between gap-4 w-full'
            >
                <View className='flex-row items-center gap-4'>
                    <View className='border border-tertiary rounded-2xl p-4'>
                        <ShieldIcon color='#c9a24d' size={28} />
                    </View>
                    <View>
                        <Text>Política de privacidad</Text>
                    </View>
                </View>
                <ChevronRightIcon color='#4F6F5D50' size={28} />
            </TouchableOpacity>
        </View>
    )
}
