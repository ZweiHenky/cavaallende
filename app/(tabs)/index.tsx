
import ContainerCardWines from '@/components/tabs/index/ContainerCardWines';
import ContainerCategoriesCarousel from '@/components/tabs/index/ContainerCategoriesCarousel';
import { ThemedView } from '@/components/ui/ThemedView';
import { useCategory } from '@/store/useCategory';
import { useShop } from '@/store/useShop';
import FilterContainer from '@/components/tabs/index/FilterContainer';
import { useGetProductByName } from '@/hooks/services/products/useGetProductByName';
import { useSearchStore } from '@/store/useSearchStore';
import { useState } from 'react';
import ContainerCardSearch from '@/components/tabs/index/ContainerCardSearch';

export default function HomeScreen() {

  // const { data: session } = authClient.useSession();
  const { addProduct } = useShop();
  const { categoryActive } = useCategory();
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const { debounceSearchText } = useSearchStore();

  return (
    <ThemedView>

      {
        debounceSearchText !== '' ? (
          <>
            <FilterContainer selectedType={selectedType} setSelectedType={setSelectedType}/>
            <ContainerCardSearch addProduct={addProduct} selectedType={selectedType} debounceSearchText={debounceSearchText} />
          </>
        ) : (
          <>
            <ContainerCategoriesCarousel />
            <FilterContainer selectedType={selectedType} setSelectedType={setSelectedType}/>
            <ContainerCardWines addProduct={addProduct} categoryActive={categoryActive} selectedType={selectedType} />
          </>
        )
      }

    </ThemedView>
  );
}
