import FilterIcon from "@/assets/icons/FilterIcon";
import { Type } from "@/infrastructure/interfaces/type.interface";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import FilterItem from "./FilterItem";
import { useGetAllTypes } from "@/hooks/services/types/useGetAllTypes";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FilterContainerProps {
    selectedType: number | null;
    setSelectedType: (selectedType: number | null) => void;
}

export default function FilterContainer({ selectedType, setSelectedType }: FilterContainerProps) {
      const { types, isLoading, error } = useGetAllTypes();
      
      const [filterActive, setFilterActive] = useState(false);
      const insets = useSafeAreaInsets();
    
    return (
        <View className='flex-col items-start justify-start px-2 mb-4'>

            <TouchableOpacity
                onPress={() => setFilterActive(true)}
                className="flex-row items-center gap-2"
            >
                <FilterIcon color="#c9a24d" size={32} />
                <Text className="text-xl font-bold text-tertiary">Filtro</Text>
            </TouchableOpacity>

            <Modal visible={filterActive} transparent animationType="slide">
                
                <View
                className="flex-1 justify-end bg-black/40"
                style={{ paddingBottom: insets.bottom }}
                >

                <View className="bg-white rounded-t-3xl p-5 gap-4">

                    {/* barrita visual */}
                    <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-2" />

                    <Text className="text-xl font-bold">Selecciona un tipo</Text>

                    {types?.map((type: Type) => (
                        <FilterItem
                            key={type.type_id}
                            type={type}
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />
                    ))}

                    <TouchableOpacity
                    onPress={() => setFilterActive(false)}
                    className="mt-3 bg-[#c9a24d] p-3 rounded-xl items-center"
                    >
                    <Text className="text-white font-bold">Cerrar</Text>
                    </TouchableOpacity>

                </View>

                </View>

            </Modal>  

        </View>
    );
}