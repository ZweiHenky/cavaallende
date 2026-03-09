import { Type } from "@/infrastructure/interfaces/type.interface";
import { TouchableOpacity, Text, View } from "react-native";
import SquareIcon from "@/assets/icons/SquareIcon";
import CloseIcon from "@/assets/icons/CloseIcon";

interface FilterItemProps {
    type: Type;
    selectedType: number | null;
    setSelectedType: (selectedType: number | null) => void;
}



export default function FilterItem({ type, selectedType, setSelectedType }: FilterItemProps) {

    const handleSelectType = (type: Type) => {
        if (selectedType === type.type_id) {
            setSelectedType(null);
        } else {
            setSelectedType(type.type_id);
        }
    };

    return (
        <TouchableOpacity
            key={type.type_id}
            onPress={() => handleSelectType(type)}
            className="flex-row justify-between items-center py-3 border-b border-gray-200"
        >
            <Text className="text-lg">{type.name}</Text>

            <View className="relative">
                <SquareIcon color="#c9a24d" size={28} />

                {selectedType === type.type_id && (
                    <View className="absolute top-0 left-0">
                        <CloseIcon color="#c9a24d" size={28} />
                    </View>
                )}
            </View>

        </TouchableOpacity>
    );
}