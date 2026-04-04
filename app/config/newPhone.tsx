import { authClient } from "@/lib/auth-client";
import { PhoneVerifyContext } from "@/providers/context/phoneVerify";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { getUserByPhone } from "@/core/actions/general/users.action";
import { ThemedView } from "@/components/ui/ThemedView";

export default function NewPhone() {

        const [pref, setPref] = useState<string>('+52');
        const [phone, setPhone] = useState<string>('');
        const [error, setError] = useState<string | undefined>("");
        const {setPhoneVerify} = useContext(PhoneVerifyContext)!;
        const { data:session } = authClient.useSession();
        const router = useRouter();
    
        const verifyPhone = async () => {
    
            if (phone.length !== 10) {
                setError("El número de teléfono debe tener 10 dígitos");
                return;
            }

            const res = await getUserByPhone(pref + phone);

            if (res?.status === "success" && res.data.length >= 1) {
                setError("El número de teléfono ya está registrado");
                return;
            }
    
            const {data, error}= await authClient.phoneNumber.sendOtp({
                phoneNumber: pref + phone
            })
    
            if (error) {
                setError(error.message);
                return;
            }
    
            if (data?.message === "code sent") {
                setPhoneVerify(pref + phone);
                router.push('/config/verify-phone');
            }else{
                setError(data?.message || "Error al enviar el código");
            }
    
        }

    return (
        <ThemedView >

            <View className="w-full flex-col items-center justify-center gap-4 mt-4 p-8">
                <View className='w-full mt-4'>
                    <Text className='text-2xl font-bold text-center text-black w-full'> {session?.user?.phoneNumber ? "Update Phone Number" : "Add Phone Number"}</Text>
                </View>
                <View className='flex-row items-center gap-2 w-full mt-4'>
                    <TextInput
                        placeholder='+52'
                        placeholderTextColor={'#999'}
                        className='text-black border border-tertiary rounded-2xl p-4 w-1/4'
                        value={pref}
                        onChangeText={setPref}
                        editable={false}
                    />
                    <TextInput
                        placeholder='Telefono'
                        placeholderTextColor={'#999'}
                        className={`text-black border ${error ? 'border-red-500' : 'border-tertiary'} rounded-2xl p-4 w-3/4 tracking-widest `}
                        value={phone}
                        keyboardType='phone-pad'
                        maxLength={10}
                        onChangeText={setPhone}
                    />
                </View>
                {error && <Text className='text-red-500'>{error}</Text>}
                <TouchableOpacity className='bg-tertiary rounded-2xl p-4 w-full mt-4 ' onPress={verifyPhone}>
                    <Text className='text-xl font-bold text-white text-center '>{session?.user?.phoneNumber ? "Update" : "Verify"}</Text>
                </TouchableOpacity>
            </View>
            
        </ThemedView>
    )
}