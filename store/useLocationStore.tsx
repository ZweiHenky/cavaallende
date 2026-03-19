import { create } from "zustand";
import * as Location from 'expo-location';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Address = Location.LocationGeocodedAddress | null;

interface LocationState {
    location: Coordinates | null;
    address: Address;
    loading: boolean;
    error: string | null;
    setLocation: (location: Coordinates | null) => void;
    setAddress: (address: Address) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    location: null,
    address: null,
    loading: false, // Default to false initially since we only search on button press
    error: null,
    setLocation: (location) => set({ location }),
    setAddress: (address) => set({ address }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
