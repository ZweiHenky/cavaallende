import { IPurchase } from '@/infrastructure/interfaces/purchase.interface';
import { formatterCurrency } from '@/utils/formatterCurrency';
import { formatterDate } from '@/utils/formatterDate';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { usePatchUpdateStatus } from '@/hooks/services/purchases/mutations/usePatchUpdateStatus';
import { IconSymbol } from '../ui/icon-symbol';

interface AdminOrderItemProps {
    item: IPurchase;
}

const STATUS_COLOR: Record<string, string> = {
    paid:       '#c9a24d',
    accepted:   '#16a34a',
    on_the_way: '#2563eb',
    completed:  '#5a0f1b',
    cancelled:  '#dc2626',
};

const STATUS_LABEL: Record<string, string> = {
    paid:       'Pendiente',
    accepted:   'Aceptado',
    on_the_way: 'En camino',
    completed:  'Completado',
    cancelled:  'Cancelado',
};

export default function AdminOrderItem({ item }: AdminOrderItemProps) {

    const router = useRouter();
    const { updateStatusMutation, isPending } = usePatchUpdateStatus();

    const statusColor = STATUS_COLOR[item.status] ?? '#888';
    const statusLabel = STATUS_LABEL[item.status] ?? item.status;

    const handleQuickAccept = () => {
        Alert.alert(
            'Aceptar pedido',
            `¿Aceptar pedido #${item.purchase_id}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Aceptar',
                    onPress: () =>
                        updateStatusMutation(
                            { id: item.purchase_id.toString(), status: 'accepted' },
                            {
                                onError: () =>
                                    Alert.alert('Error', 'No se pudo aceptar el pedido'),
                            }
                        ),
                },
            ]
        );
    };

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3 w-[90%] mx-auto">

            <TouchableOpacity
                className="flex-row justify-between items-center"
                onPress={() => router.push(`/admin/detailOrder/${item.purchase_id}`)}
                activeOpacity={0.7}
            >
                {/* Left */}
                <View className="flex-col gap-1 flex-1">
                    <Text className="text-sm text-gray-400">
                        Pedido #{item.purchase_id}
                    </Text>
                    <Text className="text-lg font-bold text-gray-800">
                        {formatterCurrency(Number(item.total))}
                    </Text>
                    <Text className="text-xs text-gray-400">
                        {formatterDate(item.created_at)}
                    </Text>
                </View>

                {/* Right */}
                <View className="items-end gap-2">
                    <View
                        style={{ backgroundColor: statusColor + '22', borderColor: statusColor, borderWidth: 1 }}
                        className="px-3 py-1 rounded-full"
                    >
                        <Text style={{ color: statusColor }} className="text-sm font-semibold">
                            {statusLabel}
                        </Text>
                    </View>
                    <IconSymbol name="chevron.right" size={22} color="#5a0f1b" />
                </View>
            </TouchableOpacity>

            {/* Quick-accept button — only for incoming (paid) orders */}
            {item.status === 'paid' && (
                <TouchableOpacity
                    disabled={isPending}
                    className={`bg-[#5a0f1b] rounded-xl py-3 mt-4 items-center ${isPending ? 'opacity-50' : ''}`}
                    onPress={handleQuickAccept}
                    activeOpacity={0.8}
                >
                    {isPending ? (
                        <ActivityIndicator color="white" size="small" />
                    ) : (
                        <Text className="text-white font-semibold text-base">
                            ✓ Aceptar pedido
                        </Text>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
}
