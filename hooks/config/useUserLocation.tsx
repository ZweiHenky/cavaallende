import { useCallback, useEffect } from "react";
import { useLocationStore } from "@/store/useLocationStore";
import * as Location from 'expo-location';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Address = Location.LocationGeocodedAddress | null;

type UseUserLocationReturn = {
  location: Coordinates | null;
  address: Address;
  loading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
};

export function useUserLocation(): UseUserLocationReturn {
  const { 
    location, 
    address, 
    loading, 
    error, 
    setLocation, 
    setAddress, 
    setLoading, 
    setError 
  } = useLocationStore();

  const getLocation = useCallback(async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission denied");
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords: Coordinates = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(coords);

      const addresses = await Location.reverseGeocodeAsync(coords);

      if (addresses.length > 0) {
        setAddress(addresses[0]);
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }, [setLocation, setAddress, setLoading, setError]);

  useEffect(() => {
    if (!location) {
      getLocation();
    }
  }, [location, getLocation]);

  return {
    location,
    address,
    loading,
    error,
    refreshLocation: getLocation,
  };
}