import { ThemedView } from '@/components/ui/ThemedView';
import { useGetDetailPurchase } from '@/hooks/services/purchases/useGetDetailPurchase';
import { formatterCurrency } from '@/utils/formatterCurrency';
import { formatterDate } from '@/utils/formatterDate';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { OrderItemsList } from '@/components/orders/OrderItemsList';
import { UserIcon } from '@/assets/icons/UserIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import CreditCardIcon from '@/assets/icons/CreditCardIcon';
import { usePatchUpdateStatus } from '@/hooks/services/purchases/mutations/usePatchUpdateStatus';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import HeaderBack from '@/components/ui/HeaderBack';

const STATUS_LABELS: Record<string, string> = {
  paid:       'Pago recibido',
  accepted:   'Aceptado',
  on_the_way: 'En camino',
  completed:  'Completado',
  cancelled:  'Cancelado',
};

const STATUS_COLOR: Record<string, string> = {
  paid:       '#c9a24d',
  accepted:   '#16a34a',
  on_the_way: '#2563eb',
  completed:  '#5a0f1b',
  cancelled:  '#dc2626',
};

export default function AdminDetailOrder() {

  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();

  const { data, isLoading, error } = useGetDetailPurchase(id);
  const { updateStatusMutation, isPending } = usePatchUpdateStatus();

  const dataOrder = data?.data;

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleAccept = () => {
    Alert.alert(
      'Confirmar pedido',
      '¿Deseas aceptar este pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: () =>
            updateStatusMutation(
              { id, status: 'accepted' },
              {
                onSuccess: () => router.back(),
                onError: () =>
                  Alert.alert('Error', 'No se pudo aceptar el pedido'),
              }
            ),
        },
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      'Rechazar pedido',
      '¿Deseas rechazar este pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Rechazar',
          style: 'destructive',
          onPress: () =>
            updateStatusMutation(
              { id, status: 'cancelled' },
              {
                onSuccess: () => router.back(),
                onError: () =>
                  Alert.alert('Error', 'No se pudo rechazar el pedido'),
              }
            ),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <ThemedView>
        <HeaderBack title="Detalle del pedido" path="../(tabs)/orders" />
        <Loading />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView>
        <HeaderBack title="Detalle del pedido" path="../(tabs)/orders" />
        <Error message={error.message} />
      </ThemedView>
    );
  }

  const statusColor = STATUS_COLOR[dataOrder?.status ?? ''] ?? '#888';
  const statusLabel = STATUS_LABELS[dataOrder?.status ?? ''] ?? dataOrder?.status?.toUpperCase();

  return (
    <ThemedView>
      <HeaderBack title="Detalle del pedido" path="../(tabs)/orders" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status badge */}
        <View className="w-[90%] mx-auto mt-4 items-center">
          <View
            style={{ backgroundColor: statusColor + '22', borderColor: statusColor, borderWidth: 1 }}
            className="px-5 py-2 rounded-full"
          >
            <Text style={{ color: statusColor }} className="text-base font-bold">
              {statusLabel}
            </Text>
          </View>
        </View>

        {/* Order card */}
        <View className="w-[90%] mx-auto mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 gap-4">

          {/* Order ID & date */}
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-400">Pedido #{id}</Text>
            {dataOrder?.created_at && (
              <Text className="text-sm text-gray-400">
                {formatterDate(dataOrder.created_at)}
              </Text>
            )}
          </View>

          {/* Customer & payment method */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <UserIcon color="#5a0f1b" size={20} />
              <Text className="text-base text-primary font-medium">
                {dataOrder?.user_name}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <CreditCardIcon color="#5a0f1b" size={20} />
              <Text className="text-base text-primary">
                {dataOrder?.payment_method === 'stripe' ? 'Tarjeta' : 'Efectivo'}
              </Text>
            </View>
          </View>

          {/* Phone call */}
          {dataOrder?.user_phone && (
            <TouchableOpacity
              className="flex-row items-center gap-3 bg-[#5a0f1b]/10 rounded-xl px-4 py-3"
              onPress={() => handleCall(dataOrder.user_phone)}
            >
              <PhoneIcon color="#5a0f1b" size={20} />
              <Text className="text-primary font-medium">
                Llamar al cliente
              </Text>
            </TouchableOpacity>
          )}

          {/* Totals */}
          <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="text-gray-800 font-semibold">
              {formatterCurrency(Number(dataOrder?.subtotal))}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">Envío</Text>
            <Text className="text-gray-800 font-semibold">
              {formatterCurrency(Number(dataOrder?.shipping_cost))}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">Impuestos</Text>
            <Text className="text-gray-800 font-semibold">
              - {formatterCurrency(Number(dataOrder?.taxes))}
            </Text>
          </View>
          <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
            <Text className="text-lg font-bold text-primary">Total</Text>
            <Text className="text-lg font-bold text-primary">
              {formatterCurrency(Number(dataOrder?.total))}
            </Text>
          </View>
        </View>

        {/* Items list */}
        <View className="w-[90%] mx-auto mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-primary mb-3">
            Artículos del pedido
          </Text>
          <OrderItemsList items={data?.data?.purchase_items ?? []} />
        </View>

        {/* Action buttons — only when order is "paid" (incoming) */}
        {dataOrder?.status === 'paid' && (
          <View className="w-[90%] mx-auto mt-6 gap-3">
            <TouchableOpacity
              disabled={isPending}
              className={`bg-[#5a0f1b] rounded-2xl py-4 items-center ${isPending ? 'opacity-50' : ''}`}
              onPress={handleAccept}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">
                  Aceptar pedido
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isPending}
              className={`border border-red-500 rounded-2xl py-4 items-center ${isPending ? 'opacity-50' : ''}`}
              onPress={handleReject}
            >
              <Text className="text-red-500 text-lg font-bold">
                ✕ Rechazar pedido
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}
