
import WineIcon from '@/assets/icons/WineIcon';
import { ThemedView } from '@/components/ui/ThemedView';
import { IProduct } from '@/infrastructure/interfaces/product.interface';
import { useShop } from '@/store/useShop';
import { formatterCurrency } from '@/utils/formatterCurrency';
import { FlatList, Image, Text, TouchableOpacity, View, } from 'react-native';

const Vinos = [
  {
    id: 1,
    name: 'Marqués de Cáceres Crianza',
    price: 28,
    image: require('@/assets/images/vino.png'),
    producer: 'Marqués de Cáceres',
    label: 'Rioja Crianza',
  },
  {
    id: 2,
    name: 'Protos Roble',
    price: 32,
    image: require('@/assets/images/vino.png'),
    producer: 'Bodegas Protos',
    label: 'Ribera del Duero',
  },
  {
    id: 3,
    name: 'Ramón Bilbao Reserva',
    price: 35,
    image: require('@/assets/images/vino.png'),
    producer: 'Ramón Bilbao',
    label: 'Rioja Reserva',
  },
  {
    id: 4,
    name: 'Viña Ardanza',
    price: 45,
    image: require('@/assets/images/vino.png'),
    producer: 'La Rioja Alta',
    label: 'Reserva Especial',
  },
  {
    id: 5,
    name: 'Pesquera Crianza',
    price: 38,
    image: require('@/assets/images/vino.png'),
    producer: 'Tinto Pesquera',
    label: 'Ribera del Duero Crianza',
  },
  {
    id: 6,
    name: 'Matarromera Crianza',
    price: 40,
    image: require('@/assets/images/vino.png'),
    producer: 'Bodega Matarromera',
    label: 'Ribera del Duero',
  },
  {
    id: 7,
    name: 'Pago de los Capellanes',
    price: 42,
    image: require('@/assets/images/vino.png'),
    producer: 'Pago de los Capellanes',
    label: 'Crianza',
  },
  {
    id: 8,
    name: 'Alión',
    price: 70,
    image: require('@/assets/images/vino.png'),
    producer: 'Bodegas Alión',
    label: 'Ribera del Duero',
  },
  {
    id: 9,
    name: 'Emilio Moro',
    price: 36,
    image: require('@/assets/images/vino.png'),
    producer: 'Bodegas Emilio Moro',
    label: 'Ribera del Duero',
  },
  {
    id: 10,
    name: 'Flor de Pingus',
    price: 95,
    image: require('@/assets/images/vino.png'),
    producer: 'Dominio de Pingus',
    label: 'Ribera del Duero',
  },
]


export default function HomeScreen() {

  // const { data: session } = authClient.useSession();
  const { addProduct } = useShop();

  return (
    <ThemedView>

      <FlatList
        data={Vinos}
        renderItem={({ item }: { item: IProduct }) => (
          <View className='flex-1 flex-row w-full rounded-2xl bg-tertiary p-2' style={{ height: 220 }}>
            <View className='w-1/3 h-full justify-center items-center overflow-visible'>
              <Image 
                source={require('@/assets/images/vino.png')} 
                className='w-[120%] h-[140%] mt-[-40px]'
                resizeMode='cover' 
              />
            </View>
            <View className='flex-1 p-2 w-1/2  items-start gap-3'>
              <View className="h-[56px] justify-center">
                <Text
                  className="text-xl font-bold text-white "
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <WineIcon size={24} color="white" />
                <Text 
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-white  w-4/5">{item.producer}</Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <WineIcon size={24} color="white" />
                <Text 
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-white w-4/5  ">{item.label}</Text>
              </View>
              <Text className='text-xl font-bold text-white '>Price: {formatterCurrency(item.price)}</Text>
              <TouchableOpacity className='bg-white rounded-2xl p-2 w-full absolute bottom-[-20px]' onPress={() => addProduct(item)}>
                <Text className='text-lg font-bold text-black text-center '>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListHeaderComponent={<View className='h-8' />}
        ItemSeparatorComponent={() => <View className='h-12' />}
        style={{
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className='h-48' />}
      />

    </ThemedView>
  );
}
