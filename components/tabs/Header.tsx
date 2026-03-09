import { Link, useRouter } from 'expo-router';
import React, { useRef, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import ShopIcon from '@/assets/icons/ShopIcon';
import { useShop } from '@/store/useShop';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import { useSearchStore } from '@/store/useSearchStore';

interface HeaderProps {
    title?: string
    showSearch?: boolean
}

export const Header = ({ title, showSearch = false }: HeaderProps) => {

    const { order } = useShop();
    const router = useRouter();
    const { isSearching, searchText, setDebounceSearchText, setSearchText, handleOpenSearch, handleCloseSearch } = useSearchStore();
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
      if (isSearching) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, [isSearching]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounceSearchText(searchText);
      }, 500);
      return () => clearTimeout(timer);
    }, [searchText]);


  return (
    <View className=''>
      <View className='pt-6 flex-row items-center px-2 justify-between pb-2'>
        {isSearching ? (
          <View className='flex-1 flex-row items-center bg-background rounded-full px-3 py-2'>
            <SearchIcon color='#c9a24d' size={22} />
            <TextInput
              ref={inputRef}
              className='flex-1 ml-2 text-base text-gray-800'
              placeholder='Buscar...'
              placeholderTextColor='#9ca3af'
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={handleCloseSearch}>
              <Text className='text-xl font-bold text-gray-500 ml-2'>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {title ? (
              <Text className='text-3xl font-bold text-tertiary'>
                {title}
              </Text>
            ) : (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeftIcon size={28} color="black" />
              </TouchableOpacity>
            )}
            <View className='flex-row items-center justify-center gap-4'>
              {showSearch && (
                <TouchableOpacity onPress={() => handleOpenSearch()}>
                  <SearchIcon color='#c9a24d' size={32} />
                </TouchableOpacity>
              )}
              <Link href="../shop">
                <ShopIcon color='#c9a24d' size={32} />
              </Link>
              <Text className='text-lg font-bold text-tertiary absolute top-[-8px] right-[-8px] bg-white rounded-full px-2'>{order.count}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};