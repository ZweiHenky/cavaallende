import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface CategoryState {
    categoryActive: number | null;
    setCategoryActive: (categoryActive: number | null) => void;
}
export const useCategory = create<CategoryState>()(
    persist(
        (set) => ({
            categoryActive: null,
            setCategoryActive: (categoryActive: number | null) => set({ categoryActive }),
        }),
        {
            name: "category",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)