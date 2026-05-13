import { Text, ScrollView, View } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import HeaderBack from '@/components/ui/HeaderBack';

export default function TermOfUse() {
  return (
    <ThemedView>
      <HeaderBack title="Términos de Uso" />
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }} 
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm text-gray-500 mb-6 mt-2">Última actualización: Abril 2026</Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Información general</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          La aplicación móvil Cava Allende (&apos;la App&apos;) es operada por Cava Allende, empresa con operaciones en Ciudad de México, México.
        </Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Al descargar, acceder o utilizar la App, el usuario acepta estos Términos de Uso.
        </Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Si el usuario no está de acuerdo con estos términos, deberá abstenerse de utilizar la aplicación.
        </Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Para cualquier duda relacionada con estos términos, puede contactar a: contact@cavaallende.com
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Descripción del servicio</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Cava Allende proporciona una plataforma móvil que permite a los usuarios:
        </Text>
        <View className="ml-4 mb-2">
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• explorar un catálogo de vinos</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• realizar pedidos de productos</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• pagar pedidos mediante tarjeta de crédito o débito</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• recibir productos mediante servicios de envío dentro de México</Text>
        </View>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Todos los productos ofrecidos en la App están sujetos a disponibilidad.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Venta de alcohol</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          La App ofrece bebidas alcohólicas (vino).
        </Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Al realizar un pedido, el usuario declara que cumple con la edad legal para comprar y consumir alcohol en México.
        </Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Cava Allende se reserva el derecho de cancelar cualquier pedido que incumpla las leyes aplicables o estos términos.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Pagos</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Los pagos se procesan a través de un proveedor externo de pagos.
        </Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Cava Allende utiliza Stripe para procesar pagos con tarjeta de manera segura.
        </Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Cava Allende no almacena información completa de tarjetas bancarias en sus servidores.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">5. Envíos y entrega</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Los pedidos se entregan mediante servicios de envío dentro del territorio mexicano.
        </Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Los tiempos de entrega pueden variar dependiendo de la ubicación del usuario y la disponibilidad del producto.
        </Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          El usuario es responsable de proporcionar información correcta de envío.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">6. Cancelación de pedidos</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Los pedidos podrán cancelarse únicamente cuando el estado del pedido sea:
        </Text>
        <View className="ml-4 mb-2">
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• Paid</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• Accepted</Text>
        </View>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Cuando el pedido cambie a los estados:
        </Text>
        <View className="ml-4 mb-2">
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• On the way</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• Completed</Text>
        </View>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          ya no será posible cancelarlo.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">7. Disponibilidad y precios</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Los precios y la disponibilidad de los productos pueden cambiar en cualquier momento sin previo aviso.
        </Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Cava Allende se reserva el derecho de modificar o descontinuar productos dentro de la App.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">8. Limitación de responsabilidad</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Cava Allende no será responsable por:
        </Text>
        <View className="ml-4 mb-4">
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• interrupciones temporales en el funcionamiento de la App</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• fallas de servicios de terceros como procesadores de pago o empresas de envío</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• retrasos ocasionados por servicios externos de logística</Text>
        </View>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">9. Cambios en los términos</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Cava Allende puede actualizar estos Términos de Uso en cualquier momento.
        </Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Las actualizaciones se publicarán dentro de la aplicación.
        </Text>
        <Text className="text-base text-slate-600 mb-8 leading-relaxed">
          El uso continuo de la App implica la aceptación de los nuevos términos.
        </Text>
      </ScrollView>
    </ThemedView>
  );
}
