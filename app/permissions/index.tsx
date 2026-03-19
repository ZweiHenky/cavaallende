import { View, Text, Pressable } from 'react-native';

import { usePermissionsStore } from '@/store/usePermissionStore';


const PermissionsScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionsStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable className='bg-blue-500 p-2 rounded-md' onPress={requestLocationPermission}>
        <Text className='text-white'>Habilitar ubicación</Text>
      </Pressable>

      <Text>Estado actual: {locationStatus}</Text>
    </View>
  );
};
export default PermissionsScreen;