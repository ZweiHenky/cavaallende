import { ThemedView } from '@/components/ui/ThemedView'
import React, { useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'expo-router';
import LanguageIcon from '@/assets/icons/LanguageIcon';
import LocationIcon from '@/assets/icons/LocationIcon';
import BellIcon from '@/assets/icons/BellIcon';
import MoonIcon from '@/assets/icons/MoonIcon';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon';
import { useLocationStore } from '@/store/useLocationStore';
import Loading from '@/components/ui/Loading';
import PhoneIcon from '@/assets/icons/PhoneIcon';


export default function Config (){

    const { data: session, isPending } = authClient.useSession()

    const router = useRouter();

    const { address } = useLocationStore();
    
    const logOut = async () => {
        await authClient.signOut();
    }

    if (isPending) {
        return (
            <ThemedView>
                <Loading />
            </ThemedView>
        )
    }

  return (
    <ThemedView>

        <ScrollView
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 120 }}
          showsVerticalScrollIndicator={false} 
          className=''
        >
            <View className='w-[95%] mx-auto flex-col items-center bg-white p-8 rounded-2xl gap-4 shadow-lg shadow-black'>
              <Text className='text-2xl font-bold text-black'>Bienvenido a Cava Allende</Text>
              {
                  session ? (
                      <>
                          <Text className='text-xl font-bold text-black'>Usuario: {session?.user?.email}</Text>
                          <TouchableOpacity className='bg-tertiary rounded-2xl p-4 w-full mt-4 ' onPress={logOut}>
                              <Text className='text-xl font-bold text-white text-center '>Logout</Text>
                          </TouchableOpacity>
                      </>
                  ) : (
                      <>
                          <Text className='text-center text-lg'>Inicia sesión para acceder a tu cuenta, favoritos y pedidos</Text>
                          <TouchableOpacity className='bg-tertiary rounded-2xl p-4 w-full mt-4 ' onPress={() => router.push('/auth/login')}>
                              <Text className='text-xl font-bold text-white text-center '>Login</Text>
                          </TouchableOpacity>
                      </>
                  )
              }
            </View>

          <View className='w-[95%] mx-auto flex-col items-center bg-white p-8 rounded-2xl gap-4 mt-4 shadow-lg shadow-black'>
              <Text className='text-2xl font-bold text-black'>Preferencias</Text>
              <View className='flex-col gap-4 w-full'>
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

                {
                  session?.user.id && (
                    <TouchableOpacity 
                      onPress={() => session?.user?.phoneNumber ? router.push('/config/phone') : router.push('/config/newPhone')}
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
                            ellipsizeMode="tail"
                            className={`w-full ${session?.user?.phoneNumber ? "text-black" : "text-red-500"}`}>
                              {session?.user?.phoneNumber || "Agregar número de teléfono"}
                            </Text>
                        </View>
                        <ChevronRightIcon color={session?.user?.phoneNumber ? '#4F6F5D50' : '#5a0f1b'} size={28} />
                      </View>
                      
                    </TouchableOpacity>
                  )
                }
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
                        ellipsizeMode="tail"
                        className='w-full '>
                          {address?.formattedAddress}
                        </Text>
                    </View>
                    <ChevronRightIcon color='#4F6F5D50' size={28} />
                  </View>
                  
                </TouchableOpacity>
                <View className='flex-row items-center justify-between gap-4 w-full'>
                  <View className='flex-row items-center gap-4'>
                    <View className='border border-tertiary rounded-2xl p-4'>
                      <BellIcon color='#c9a24d' size={28} />
                    </View>
                    <View>
                      <Text>Notificaciones</Text>
                      <Text>Activar</Text>
                    </View>
                  </View>
                  <ChevronRightIcon color='#4F6F5D50' size={28} />
                </View>
                <View className='flex-row items-center justify-between gap-4 w-full'>
                  <View className='flex-row items-center gap-4'>
                    <View className='border border-tertiary rounded-2xl p-4'>
                      <MoonIcon color='#c9a24d' size={28} />
                    </View>
                    <View>
                      <Text>Tema</Text>
                      <Text>Claro</Text>
                    </View>
                  </View>
                  <ChevronRightIcon color='#4F6F5D50' size={28} />
                </View>
              </View>
          </View>

          <View className='w-[95%] mx-auto flex-col items-center bg-white p-8 rounded-2xl gap-4 mt-4 shadow-lg shadow-black'>
            <Text className='text-2xl font-bold text-black'>Ayuda</Text>
            <Text className='text-lg text-center'>Si tienes alguna pregunta o problema, no dudes en contactarnos</Text>
            <View className='flex-row items-center justify-between gap-4 w-full'>
                <View className='flex-row items-center gap-4'>
                  <View className='border border-tertiary rounded-2xl p-4'>
                    <MoonIcon color='#c9a24d' size={28} />
                  </View>
                  <View>
                    <Text>Centro de ayuda</Text>
                  </View>
                </View>
                <ChevronRightIcon color='#4F6F5D50' size={28} />
              </View>
              <View className='flex-row items-center justify-between gap-4 w-full'>
                <View className='flex-row items-center gap-4'>
                  <View className='border border-tertiary rounded-2xl p-4'>
                    <MoonIcon color='#c9a24d' size={28} />
                  </View>
                  <View>
                    <Text>Terminos y condiciones</Text>
                  </View>
                </View>
                <ChevronRightIcon color='#4F6F5D50' size={28} />
              </View>
              <View className='flex-row items-center justify-between gap-4 w-full'>
                <View className='flex-row items-center gap-4'>
                  <View className='border border-tertiary rounded-2xl p-4'>
                    <MoonIcon color='#c9a24d' size={28} />
                  </View>
                  <View>
                    <Text>Política de privacidad</Text>
                  </View>
                </View>
                <ChevronRightIcon color='#4F6F5D50' size={28} />
              </View>
          </View>

          
        </ScrollView>

    </ThemedView>
  )
}
