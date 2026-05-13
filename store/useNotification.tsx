import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NotificationState {
    statusNotification: boolean ;
    setStatusNotification: (status: boolean) => void;
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set) => ({
            statusNotification: true,
            setStatusNotification: (status: boolean) => set({ statusNotification: status }),
        }),
        {
            name: "notification",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);