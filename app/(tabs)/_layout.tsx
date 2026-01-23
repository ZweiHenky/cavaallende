import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/tabs/Header';
import {LinearGradient} from 'expo-linear-gradient';


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
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#E6DCC8',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
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
            marginHorizontal: 0,
            position: 'absolute',
            bottom: 10,
            borderColor:"transparent",
          },
          headerShown: false, // importante
          animation:"none",
          tabBarBackground: () => (
            <LinearGradient
              colors={["transparent", "#E6DCC8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarActiveTintColor: '#4F6F5D',
            tabBarInactiveTintColor: '#8FAE9E',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name="house.fill" color={focused ? "#4F6F5D" : "#8FAE9E"} />
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
            tabBarActiveTintColor: '#4F6F5D',
            tabBarInactiveTintColor: '#8FAE9E',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name="house.fill" color={focused ? "#4F6F5D" : "#8FAE9E"} />
            ),
            tabBarButton: ({ children, onPress }) => (
              <CircleTab onPress={onPress}>{children}</CircleTab>
            ),
          }}
        />

        <Tabs.Screen
          name="config"
          options={{
            title: 'Config',
            tabBarActiveTintColor: '#4F6F5D',
            tabBarInactiveTintColor: '#8FAE9E',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name="house.fill" color={focused ? "#4F6F5D" : "#8FAE9E"} />
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