import * as Location from 'expo-location';
import { LatLng } from '@/infrastructure/interfaces/latlng.interface';

export const getCurrentLocation = async (): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    console.log("coords", coords);
    

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error getting users location');
  }
};

export const watchCurrentPosition = (
  locationCallback: (location: LatLng) => void
) => {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 10,
    },
    ({ coords }) => {
      locationCallback({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  );
};