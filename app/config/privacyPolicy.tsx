import { Text, ScrollView, View } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import HeaderBack from '@/components/ui/HeaderBack';

export default function PrivacyPolicy() {
  return (
    <ThemedView>
      <HeaderBack title="Aviso de Privacidad" />
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }} 
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm text-gray-500 mb-6 mt-2">Última actualización: Abril 2026</Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Responsable del tratamiento de datos</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Cava Allende es responsable del tratamiento de los datos personales recopilados a través de la aplicación Cava Allende.
        </Text>
        <Text className="text-base text-slate-600 mb-1 leading-relaxed">
          <Text className="font-semibold text-slate-700">Ubicación:</Text> Ciudad de México, México
        </Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          <Text className="font-semibold text-slate-700">Contacto:</Text> contact@cavaallende.com
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Información que recopilamos</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          La App puede recopilar la siguiente información:
        </Text>
        <View className="ml-4 mb-4">
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• nombre</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• correo electrónico</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• número telefónico</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• dirección de envío</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• información de pedidos</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• información de pago procesada mediante Stripe</Text>
        </View>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Uso de la información</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          La información recopilada se utiliza únicamente para:
        </Text>
        <View className="ml-4 mb-4">
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• procesar y gestionar pedidos</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• realizar envíos de productos</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• procesar pagos</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• brindar soporte al usuario</Text>
        </View>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Procesamiento de pagos</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Los pagos se procesan de forma segura a través de Stripe.
        </Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Stripe puede recopilar y procesar información financiera necesaria para completar las transacciones conforme a sus propias políticas de privacidad.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">5. Seguridad de la información</Text>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Cava Allende implementa medidas razonables de seguridad para proteger la información personal de los usuarios contra accesos no autorizados, divulgación o uso indebido.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">6. Derechos de los usuarios</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Los usuarios pueden solicitar:
        </Text>
        <View className="ml-4 mb-2">
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• acceso a sus datos personales</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• corrección de información incorrecta</Text>
          <Text className="text-base text-slate-600 mb-1 leading-relaxed">• eliminación de su cuenta</Text>
        </View>
        <Text className="text-base text-slate-600 mb-4 leading-relaxed">
          Las solicitudes pueden enviarse a: contact@cavaallende.com
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-6 mb-2">7. Cambios en el aviso de privacidad</Text>
        <Text className="text-base text-slate-600 mb-2 leading-relaxed">
          Este Aviso de Privacidad puede actualizarse periódicamente.
        </Text>
        <Text className="text-base text-slate-600 mb-8 leading-relaxed">
          Las actualizaciones se publicarán dentro de la aplicación.
        </Text>
      </ScrollView>
    </ThemedView>
  );
}
