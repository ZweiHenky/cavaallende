import { create } from "zustand";

interface SearchState {
    isSearching: boolean;
    searchText: string; 
    debounceSearchText: string;
    setDebounceSearchText: (debounceSearchText: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    setSearchText: (searchText: string) => void;
    handleCloseSearch: () => void;
    handleOpenSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    isSearching: false,
    searchText: '',
    debounceSearchText: '',
    setIsSearching: (isSearching: boolean) => set({ isSearching }),
    setSearchText: (searchText: string) => set( { searchText }),
    setDebounceSearchText: (debounceSearchText: string) => set( { debounceSearchText }),
    handleCloseSearch: () => set({ isSearching: false, searchText: '', debounceSearchText: '' }),
    handleOpenSearch: () => set({ isSearching: true }),
}))
    