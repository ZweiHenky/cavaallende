import { useEffect } from "react";
import socket from "@/core/socket/connect";
import { LatLng } from "@/infrastructure/interfaces/latlng.interface";

export const useTracker = (location: LatLng | null, purchase_id: string, name: string) => {

  useEffect(() => {

    if (!location?.latitude || !location?.longitude) return;

    socket.emit("joinRoom", purchase_id);

    socket.emit(name, {
      latitude: location.latitude,
      longitude: location.longitude,
      purchase_id
    });

  }, [location, purchase_id, name]);

};