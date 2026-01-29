
import ContainerCardWines from '@/components/tabs/index/ContainerCardWines';
import ContainerCategoriesCarousel from '@/components/tabs/index/ContainerCategoriesCarousel';
import { ThemedView } from '@/components/ui/ThemedView';
import { useCategory } from '@/store/useCategory';
import { useShop } from '@/store/useShop';


export default function HomeScreen() {

  // const { data: session } = authClient.useSession();
  const { addProduct } = useShop();
  const { categoryActive } = useCategory();


  return (
    <ThemedView >

      <ContainerCategoriesCarousel />

      <ContainerCardWines addProduct={addProduct} categoryActive={categoryActive} />

    </ThemedView>
  );
}
