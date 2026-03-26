import * as Location from 'expo-location';
import { create } from 'zustand';

import { LatLng } from '@/infrastructure/interfaces/latlng.interface';
import {
  getCurrentLocation,
  watchCurrentPosition,
} from '@/core/actions/location/location';

interface LocationState {
  lastKnownLocation: LatLng | null;
  userLocationList: LatLng[];
  watchSubscriptionID: Location.LocationSubscription | null;
  address: Location.LocationGeocodedAddress | null;
  lastKnownLocationOther: LatLng | null;
  getLocation: () => Promise<LatLng>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
  setAddress: () => void;
  setLastKnownLocationOther: (location: LatLng) => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchSubscriptionID: null,
  address: null,
  lastKnownLocationOther: null,
  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnownLocation: location });

    return location;
  },

  setAddress: async () => {
    const location = get().lastKnownLocation;
    if (location === null) return;

    const coords: LatLng = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    const addresses = await Location.reverseGeocodeAsync(coords);

    if (addresses.length > 0) {
      set({ address: addresses[0] });
    }
  },

  watchLocation: async () => {
    const oldSubscription = get().watchSubscriptionID;
    if (oldSubscription !== null) {
      get().clearWatchLocation();
    }

    const watchSubscription = await watchCurrentPosition((latLng) => {
      set({
        lastKnownLocation: latLng,
        userLocationList: [...get().userLocationList, latLng],
      });
    });

    set({ watchSubscriptionID: watchSubscription });
  },

  clearWatchLocation: () => {
    const subscription = get().watchSubscriptionID;

    if (subscription !== null) {
      subscription.remove();
    }
  },

  setLastKnownLocationOther: (location: LatLng) => {
    set({ lastKnownLocationOther: location });
  },
}));