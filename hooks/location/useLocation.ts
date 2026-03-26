import { useEffect } from "react";
import { useLocationStore } from "@/store/useLocationStore";

export const useLocation = () => {
    const { getLocation, setAddress, lastKnownLocation } = useLocationStore();

    useEffect(() => {
        if (!lastKnownLocation) getLocation();
    }, [lastKnownLocation, getLocation]);

    useEffect(() => {
        if (lastKnownLocation) setAddress();
    }, [lastKnownLocation, setAddress]);
}
