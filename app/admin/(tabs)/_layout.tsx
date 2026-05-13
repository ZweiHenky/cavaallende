import { Tabs, usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ui/ThemedView';
import { Header } from '@/components/tabs/Header';
import { LinearGradient } from 'expo-linear-gradient';
import InboxIcon from '@/assets/icons/InboxIcon';
import SettingsIcon from '@/assets/icons/SettingsIcon';
import { authClient } from '@/lib/auth-client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CircleTab({ children, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: 'center' }}
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
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

export default function AdminTabLayout() {

  const { data: session } = authClient.useSession();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isBottom = insets.bottom > 20;

  useEffect(() => {
    if (session?.user.role !== 'admin') {
      router.replace('/(tabs)');
    }
  }, [session, router]);

  return (
    <ThemedView>
      <StatusBar style="dark" />
      <Header title="Admin — Cava Allende" showSearch={false} showCart={false} />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            elevation: 0,
            marginHorizontal: 0,
            position: 'absolute',
            bottom: isBottom ? -20 : 10,
            borderColor: 'transparent',
          },
          headerShown: false,
          animation: 'none',
          tabBarBackground: () => (
            <LinearGradient
              colors={['#f5f2eb15', '#f5f2eb70', '#f5f2eb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="orders"
          options={{
            tabBarLabel: () => null,
            tabBarActiveTintColor: '#c9a24d',
            tabBarInactiveTintColor: '#5a0f1b',
            tabBarIcon: ({ focused }) => (
              <InboxIcon size={28} color={focused ? '#c9a24d' : '#5a0f1b'} />
            ),
            tabBarButton: ({ children, onPress }) => (
              <CircleTab onPress={onPress}>{children}</CircleTab>
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="config"
          options={{
            tabBarLabel: () => null,
            tabBarActiveTintColor: '#c9a24d',
            tabBarInactiveTintColor: '#5a0f1b',
            tabBarIcon: ({ focused }) => (
              <SettingsIcon size={28} color={focused ? '#c9a24d' : '#5a0f1b'} />
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
