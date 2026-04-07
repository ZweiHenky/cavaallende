import { Text, Pressable, ActivityIndicator, View } from 'react-native';

import { usePermissionsStore } from '@/store/usePermissionStore';
import { ThemedView } from '@/components/ui/ThemedView';


const PermissionsScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionsStore();

  if (locationStatus === 'checking') {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <ThemedView>
      <View className='flex-1 justify-center items-center'>
        <Pressable className='bg-secondary p-2 rounded-md' onPress={requestLocationPermission}>
          <Text className='text-white'>Habilitar ubicación</Text>
        </Pressable>
        <Text>Estado actual: {locationStatus}</Text>
      </View>
    </ThemedView>
  );
};
export default PermissionsScreen;