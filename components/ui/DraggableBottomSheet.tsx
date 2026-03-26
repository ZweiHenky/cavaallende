import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Animated, PanResponder, Dimensions } from 'react-native';

interface DraggableBottomSheetProps {
    children: React.ReactNode;
}

export function DraggableBottomSheet({ children }: DraggableBottomSheetProps) {
    const { height: screenHeight } = Dimensions.get('window');
    const MAX_HEIGHT = screenHeight * 0.5;
    
    const panY = useRef(new Animated.Value(0)).current;
    const offsetY = useRef(0);

    useEffect(() => {
        const panListener = panY.addListener(({ value }) => {
            offsetY.current = value;
        });
        return () => {
            panY.removeListener(panListener);
        };
    }, [panY]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                panY.setOffset(offsetY.current);
                panY.setValue(0);
            },
            onPanResponderMove: Animated.event([null, { dy: panY }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (e, gestureState) => {
                panY.flattenOffset();
                if (offsetY.current > MAX_HEIGHT / 4 || gestureState.vy > 1) {
                    Animated.spring(panY, {
                        toValue: MAX_HEIGHT - 140, // Deja 140px expuestos cuando se minimiza
                        useNativeDriver: false,
                    }).start();
                } else {
                    Animated.spring(panY, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    const translateY = panY.interpolate({
        inputRange: [-100, 0, MAX_HEIGHT - 140, MAX_HEIGHT],
        outputRange: [0, 0, MAX_HEIGHT - 140, MAX_HEIGHT - 140],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0, 
                zIndex: 900,
                height: '50%',
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
                transform: [{ translateY }],
            }}
        >
            {/* Drag Handle */}
            <View 
                {...panResponder.panHandlers}
                style={{ 
                    width: '100%', 
                    alignItems: 'center', 
                    paddingTop: 12,
                    paddingBottom: 12,
                    backgroundColor: 'transparent'
                }}
            >
                <View style={{ width: 40, height: 5, backgroundColor: '#cbd5e1', borderRadius: 3 }} />
            </View>

            <ScrollView 
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingBottom: 40,
                }}
            >
                {children}
            </ScrollView>
        </Animated.View>
    );
}
