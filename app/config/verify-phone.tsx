import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ThemedView } from '@/components/ui/ThemedView'
import { authClient } from '@/lib/auth-client';
import { PhoneVerifyContext } from '@/providers/context/phoneVerify';
import { Link, useRouter } from 'expo-router';
import HeaderBack from '@/components/ui/HeaderBack';

export default function VerifyPhone() {
    const [code, setCode] = useState<string>('');
    const {phoneVerify} = useContext(PhoneVerifyContext)!;
    const [error, setError] = useState<string | undefined>("");
    const [timer, setTimer] = useState<number>(30);
    const router = useRouter();

    const verifyPhone = async () => {
        const { data, error } = await authClient.phoneNumber.verify({
            code,
            phoneNumber: phoneVerify,
            disableSession: false,
            updatePhoneNumber: true,
        });

        if (error) {
            setError(error.message || "Error al verificar el código");
            return;
        }

        router.replace('/config/phone');
    }

    const resendCode = async () => {
        const { data, error } = await authClient.phoneNumber.sendOtp({
            phoneNumber: phoneVerify,
        });

        if (error) {
            setError(error.message || "Error al enviar el código");
            return;
        }

        if (data?.message === "code sent") {
            setError("Código reenviado exitosamente");
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 1) {
                    return prevTimer - 1;
                }
                clearInterval(interval);
                return 0;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
  return (
    <ThemedView>

        <HeaderBack title="Phone Number" />

        <View className='w-full mx-auto flex-col items-center p-8 rounded-2xl gap-8 mt-4 '>
            <View className='w-full'>
                <Text className='text-2xl font-bold text-center text-black w-full'>Verifica tu número de teléfono</Text>
            </View>
            <View className='w-full'>
                <Text className='text-xl font-bold text-center text-black w-full'>Ingresa el código de 6 dígitos que enviamos a tu número de teléfono</Text>
            </View>
            <View className='w-full'>
                <TextInput
                    placeholder="Código"
                    value={code}
                    onChangeText={setCode}
                    className='text-black border border-tertiary rounded-2xl p-4 w-full'
                />
            </View>
            {error && <Text className='text-red-500'>{error}</Text>}

            <View className='w-full'>
                {
                    timer === 0 ? (
                        <TouchableOpacity onPress={resendCode}  >
                            <Text className='text-xl font-bold text-tertiary text-center '>Reenviar código</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text className='text-xl font-bold text-tertiary text-center '>{timer}s <Text className="text-secondary">Para reenviar el código</Text></Text>
                    )
                }
            </View>

            <View className='w-full'>
                <TouchableOpacity
                    onPress={verifyPhone}
                    className='bg-tertiary rounded-2xl p-4 w-full mt-4'
                >
                    <Text className='text-xl font-bold text-white text-center '>Verificar</Text>
                </TouchableOpacity>
            </View>


        </View>
      
    </ThemedView>
  )
}