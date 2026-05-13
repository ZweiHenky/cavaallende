import { create } from "zustand";

interface ImagesState {
    images: Record<string, any>;
    setImages: (images: any) => void;
    getImage: (image: string) => any;
}

export const useImages = create<ImagesState>((set) => ({
    images: {
        "/drifting-cabernet-sauvignon.png": require("@/assets/products/drifting-cabernet-sauvignon.png"),
        "/inedito-tinto-roble.png": require("@/assets/products/inedito-tinto-roble.png"),
        "/inscription-pinot-noir.png": require("@/assets/products/inscription-pinot-noir.png"),
        "/atempo-sauvignon-blanc.png": require("@/assets/products/atempo-sauvignon-blanc.png"),
        "/vinaltura-ancestral.png": require("@/assets/products/vinaltura-ancestral.png"),
    },
    setImages: (images: any) => set({ images }),
    getImage: (image: string) => {
        const images = useImages.getState().images;
        return images[image];
    },
}));