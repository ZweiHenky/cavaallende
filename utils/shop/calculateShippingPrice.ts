import { calculateDistance } from "./calculateDistance";

    export function calculateShippingPrice(lat1: number , lng1: number, lat2: number, lng2: number) {
      const distancia = calculateDistance(lat1, lng1, lat2, lng2);

      const tarifaBase = 50;
      const precioPorKm = 10;

      const precio = tarifaBase + (distancia * precioPorKm);

      return {
        distancia: distancia.toFixed(2),
        precio: precio.toFixed(2)
      };
    }