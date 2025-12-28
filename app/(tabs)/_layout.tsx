import { Link, Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ui/ThemedView';
import { UserIcon } from '@/assets/icons/UserIcon';

const Header = () => {
  return (
    <View
      className=''
    >
      <View className='py-6 flex-row items-cente px-2 justify-between'>
        <Text className='text-3xl font-bold'>
          Cava Allende
        </Text>
        <View className='flex-row items-center justify-center gap-2'>
          <Link href="../auth/register">
            <UserIcon color='#000' size={32} />
          </Link>
        </View>
      </View>
    </View>
  );
};

function CircleTab({ children, selected, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#E6DCC8',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 10,
          shadowColor: 'black',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {


  return (
    <ThemedView>
      <StatusBar style="dark" />
      {/* HEADER VISUAL */}
      <Header />

      {/* TABS */}
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            elevation: 0,
            marginHorizontal: 60,
          },
          headerShown: false, // importante
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
            tabBarButton: ({ children, onPress }) => (
              <CircleTab onPress={onPress}>{children}</CircleTab>
            ),
          }}
        />

        <Tabs.Screen
          name="reviews"
          options={{
            title: 'Reviews',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
            tabBarButton: ({ children, onPress }) => (
              <CircleTab onPress={onPress}>{children}</CircleTab>
            ),
          }}
        />
      </Tabs>
    </ThemedView>
  );
}