import { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';
import { router } from 'expo-router';

import { PermissionStatus } from '@/infrastructure/interfaces/location.interface';

import { usePermissionsStore } from '@/store/usePermissionStore';

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace('/(tabs)');
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace('/permissions');
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};
export default PermissionsCheckerProvider;