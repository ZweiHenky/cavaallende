import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

interface CustomMarkerPinProps {
    imageSource: ImageSourcePropType;
    onLoadEnd?: () => void;
}

export function CustomMarkerPin({ imageSource, onLoadEnd }: CustomMarkerPinProps) {
    return (
        <View className="items-center">
            {/* circulo con borde */}
            <View className="w-10 h-10 rounded-full bg-white border-4 border-white items-center justify-center shadow-lg">
                <Image source={imageSource} onLoadEnd={onLoadEnd} className="w-9 h-9" />
            </View>

            {/* punta */}
            <View
                style={{
                width: 1,
                height: 2,
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderTopWidth: 10,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderTopColor: "white",
                marginTop: -2,
                }}
            />

            {/* relleno de la punta */}
            <View
                style={{
                position: "absolute",
                top: 36,
                width: 1,
                height: 2,
                borderLeftWidth: 6,
                borderRightWidth: 6,
                borderTopWidth: 8,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderTopColor: "#3b82f6",
                }}
            />
        </View>
    );
}
