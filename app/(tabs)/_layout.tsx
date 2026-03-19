import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/tabs/Header';
import {LinearGradient} from 'expo-linear-gradient';
import InfoIcon from '@/assets/icons/InfoIcon';
import SettingsIcon from '@/assets/icons/SettingsIcon';
import InboxIcon from '@/assets/icons/InboxIcon';


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
          backgroundColor: '#f5f2eb',
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

      {usePathname() === "/" ? (
        <Header title="Cava Allende" showSearch={true} />
      ) : (
        <Header title="Cava Allende" />
      )}

      {/* TABS */}
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            elevation: 0,
            marginHorizontal: 0,
            position: 'absolute',
            bottom: -20,
            borderColor:"transparent",
          },
          headerShown: false, // importante
          animation:"none",
          tabBarBackground: () => (
            <LinearGradient
              colors={["#f5f2eb15", "#f5f2eb70", "#f5f2eb"]}
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
            tabBarLabel(props) {
              return null;
            },
            tabBarActiveTintColor: '#c9a24d',
            tabBarInactiveTintColor: '#5a0f1b',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name="house.fill" color={focused ? "#c9a24d" : "#5a0f1b"} />
            ),
            tabBarButton: ({ children, onPress }) => (
              <CircleTab onPress={onPress}>{children}</CircleTab>
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="orders"
          options={{
            tabBarLabel(props) {
              return null;
            },
            tabBarActiveTintColor: '#c9a24d',
            tabBarInactiveTintColor: '#5a0f1b',
            tabBarIcon: ({ color, focused }) => (
              <InboxIcon size={28} color={focused ? "#c9a24d" : "#5a0f1b"} />
            ),
            tabBarButton: ({ children, onPress }) => (
              <CircleTab onPress={onPress}>{children}</CircleTab>
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="reviews"
          options={{
            tabBarLabel(props) {
              return null;
            },
            tabBarActiveTintColor: '#c9a24d',
            tabBarInactiveTintColor: '#5a0f1b',
            tabBarIcon: ({ color, focused }) => (
              <InfoIcon size={28} color={focused ? "#c9a24d" : "#5a0f1b"} />
            ),
            tabBarButton: ({ children, onPress }) => (
              <CircleTab onPress={onPress}>{children}</CircleTab>
            ),
          }}
        />

        <Tabs.Screen
          name="config"
          options={{
            tabBarLabel(props) {
              return null;
            },
            tabBarActiveTintColor: '#c9a24d',
            tabBarInactiveTintColor: '#5a0f1b',
            tabBarIcon: ({ color, focused }) => (
              <SettingsIcon size={28} color={focused ? "#c9a24d" : "#5a0f1b"} />
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