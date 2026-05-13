import { Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import { useGetAccount } from "@/hooks/services/stripe/useGetAccount";
import Loading from "@/components/ui/Loading";
import { ThemedView } from "@/components/ui/ThemedView";
import HeaderBack from "@/components/ui/HeaderBack";
import { usePatchStatus } from "@/hooks/services/stripe/mutations/usePatchStatus";

export default function FormNewDelivery({url, accountId}: {url: string, accountId: string}) {

    const router = useRouter();
    const {data, isLoading} = useGetAccount(accountId);
    const { mutateAsync, isPending: isPendingUpdate } = usePatchStatus();


    if(isLoading){
        return (
            <ThemedView>
                <HeaderBack title="Cuenta de repartidor" path="../(tabs)/config" />
                <Loading/>
            </ThemedView>
        );
    }

    const account = data?.data;

    return (
        <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}

            onNavigationStateChange={async (navState) => {


                if(navState.url.includes("v0/api/stripe/connect/return")){
                    if(account?.requirements?.entries.length === 0  && account?.configuration?.recipient?.capabilities?.stripe_balance?.stripe_transfers?.status === "active" && account?.configuration?.recipient?.capabilities?.stripe_balance.stripe_transfers.status === "active"){

                        const res = await mutateAsync(accountId);

                        if(res.status !== "success"){
                            Alert.alert("Error", "Error al activar la cuenta", [
                                {
                                    text: "OK",
                                    onPress: () => router.replace("/deliveries/config/accountStripe")
                                }
                            ]);
                            return;
                        }

                        router.replace("/deliveries/config/accountStripe");
                        return;
                    }
                    
                   for(const entry of account?.requirements?.entries!){
                        if(entry.description === "identity.individual.documents.primary_verification"){
                            Alert.alert("Error", "Falta agregar tu identificacion oficial", [
                                {
                                    text: "OK",
                                    onPress: () => router.replace("/deliveries/config/accountStripe")
                                }
                            ]);
                            return;
                        }
                        if(entry.description === "identity.attestations.terms_of_service.account.date"){
                            Alert.alert("Error", "Debes aceptar los terminos y condiciones", [
                                {
                                    text: "OK",
                                    onPress: () => router.replace("/deliveries/config/accountStripe")
                                }
                            ]);
                            return;
                        }
                   }

                    router.replace("/deliveries/config/accountStripe");
                }
                if(navState.url.includes("v0/api/stripe/connect/retry")){
                    Alert.alert("Error", "Error al activar la cuenta");
                }
            }}
        />
    );
}