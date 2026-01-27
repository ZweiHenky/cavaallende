
import ContainerCardWines from '@/components/tabs/index/ContainerCardWines';
import ContainerCategoriesCarousel from '@/components/tabs/index/ContainerCategoriesCarousel';
import { ThemedView } from '@/components/ui/ThemedView';
import { useShop } from '@/store/useShop';


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
    <ThemedView >

      <ContainerCategoriesCarousel />

      <ContainerCardWines data={Vinos} addProduct={addProduct} />

    </ThemedView>
  );
}
