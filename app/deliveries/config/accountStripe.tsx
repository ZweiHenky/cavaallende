import { ThemedView } from "@/components/ui/ThemedView";
import HeaderBack from "@/components/ui/HeaderBack";
import { authClient } from "@/lib/auth-client";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useGetStripeByUserId } from "@/hooks/services/users/useGetStripeById";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { formatterCurrency } from "@/utils/formatterCurrency";
import { useGetLink } from "@/hooks/services/stripe/mutations/useGetLink";
import FormNewDelivery from "@/components/config/stripe/formNewDelivery";
import { useGetSummary } from "@/hooks/services/earningsDeliveries/useGetSummary";
import { useTransfer } from "@/hooks/services/payoutsDeliveries/mutations/useTransfer";
import { useGetBalance } from "@/hooks/services/stripe/useGetBalance";


export default function AccountStripe() {

    const { data: session, refetch } = authClient.useSession();
    const { data, isLoading, error } = useGetStripeByUserId(session?.user.id!);
    const { mutateAsync, isPending: isPendingLink, error: linkError } = useGetLink();
    const [link, setLink] = useState<string | null>(null);
    const { data: summary, isLoading: isLoadingSummary, error: errorSummary } = useGetSummary(session?.user.id!);
    // const { transfer, isPending: isPendingTransfer } = useTransfer();
    const { data: balance, isLoading: isLoadingBalance, error: balanceError } = useGetBalance({ accountId: data?.data.stripe_id! });

    console.log("Balance", balance?.available[0].amount);

    const handleActivateAccount = async () => {

        if (data?.data.is_active) {
            Alert.alert("Cuenta activa", "Ya tienes una cuenta activa");
            return;
        }

        const res = await mutateAsync(data?.data.stripe_id!);

        if (res.status === 500) {
            Alert.alert("Error", "Error al generar el enlace");
            return;
        }

        if (res.onboardingUrl) {
            setLink(res.onboardingUrl);
        }

    }

    // const handleTransfer = async () => {

    //     if(summary?.data?.available === 0){
    //         Alert.alert("Saldo insuficiente", "No tienes saldo para transferir");
    //         return;
    //     }

    //     await transfer({user_id: session?.user.id!, amount: summary?.data?.available!});

    // }

    useEffect(() => {
        if (session?.user.role === "user") {
            refetch();
        }
    }, [session, refetch]);

    if (isLoading) {
        return (
            <ThemedView>
                <HeaderBack title="Cuenta de repartidor" path="../(tabs)/config" />
                <Loading />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView>
                <HeaderBack title="Cuenta de repartidor" path="../(tabs)/config" />
                <Error message="Error al cargar la cuenta de repartidor" />
            </ThemedView>
        );
    }

    if (isLoadingSummary) {
        return (
            <ThemedView>
                <HeaderBack title="Balance de cuenta" path="../(tabs)/config" />
                <Loading />
            </ThemedView>
        );
    }

    if (errorSummary) {
        return (
            <ThemedView>
                <HeaderBack title="Balance de cuenta" path="../(tabs)/config" />
                <Error message="Error al cargar las ganancias" />
            </ThemedView>
        );
    }

    if (isPendingLink) {
        return (
            <ThemedView>
                <HeaderBack title="Cuenta de repartidor" path="../(tabs)/config" />
                <Loading />
            </ThemedView>
        );
    }

    if (link && data?.data.stripe_id) {
        return (
            <ThemedView>
                <FormNewDelivery url={link} accountId={data?.data.stripe_id!} />
            </ThemedView>
        );
    }


    return (
        <ThemedView>
            <HeaderBack title="Balance de cuenta" path="../(tabs)/config" />
            <View className="w-[95%] mx-auto flex-col p-8 rounded-2xl gap-6 mt-4 shadow-lg shadow-black/10">
                <View className="w-full flex-col gap-4 items-center">
                    <View className="w-full flex-row justify-between gap-4">
                        <View className="border border-tertiary rounded-2xl p-4 flex-1 items-center justify-center bg-[#fefaef]">
                            <Text className="text-2xl font-bold text-[#c9a24d]">{formatterCurrency(balance?.available[0].amount / 100 || 0)}</Text>
                            <Text className="text-xs text-gray-500 mt-2 text-center">Saldo disponible</Text>
                        </View>
                        <View className="border border-tertiary rounded-2xl p-4 flex-1 items-center justify-center bg-[#fefaef]">
                            <Text className="text-2xl font-bold text-[#c9a24d]">{formatterCurrency(summary?.data?.pending || 0)}</Text>
                            <Text className="text-xs text-gray-500 mt-2 text-center">Saldo en espera</Text>
                        </View>
                    </View>
                    <View className={`rounded-xl px-4 py-2 mt-2 ${data?.data.is_active ? 'bg-green-100' : 'bg-red-100'}`}>
                        <Text className={`text-lg font-bold ${data?.data.is_active ? 'text-green-700' : 'text-red-700'}`}>
                            {data?.data.is_active ? 'Cuenta Activa' : 'Se requiere activar cuenta'}
                        </Text>
                    </View>
                    {/* <TouchableOpacity
                        onPress={data?.data.is_active ? handleTransfer : handleActivateAccount}
                        className="w-full mt-4 bg-tertiary rounded-2xl p-4"
                        disabled={isPendingLink || isPendingTransfer}
                    >
                        {isPendingLink || isPendingTransfer ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-lg font-bold text-white text-center">
                                {data?.data.is_active ? 'Transferir saldo' : 'Activar cuenta'}
                            </Text>
                        )}
                    </TouchableOpacity> */}
                </View>
            </View>
        </ThemedView>
    );
}