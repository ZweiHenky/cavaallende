
import { IProduct } from "@/infrastructure/interfaces/product.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IOrder } from "@/infrastructure/interfaces/order.interface";

interface IShop {
    order: IOrder;
    setOrder: (order: IOrder) => void;
    addProduct: (product: IProduct) => void;
    removeProduct: (id: number) => void;
    addQuantity: (id: number) => void;
    removeQuantity: (id: number) => void;
    clearOrder: () => void;
}

export const useShop = create<IShop>()(
    persist(
        (set,get) => ({
            order: {
                products: [],
                count: 0,
                total: 0,
            },
            setOrder: (order: IOrder) => set({ order }),
            addProduct: (item: IProduct) => {
                const productInOrder = get().order.products.find((product) => product.product.id === item.id);
                if (productInOrder) {
                    set({ order: { ...get().order, products: get().order.products.map((product) => product.product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product), count: get().order.count + 1, total: get().order.total + item.price } })
                } else {
                    set({ order: { ...get().order, products: [...get().order.products, {product: item, quantity: 1}], count: get().order.count + 1, total: get().order.total + item.price } })
                }
            },
            removeProduct: (id: number) => {
                const product = get().order.products.find((product) => product.product.id === id);
                if (!product) return;
                //quita toto el producto de la orden
                set({
                    order: {
                        ...get().order,
                        products: get().order.products.filter((p) => p.product.id !== id),
                        count: get().order.count - product.quantity,
                        total: get().order.total - (product.quantity * product.product.price),
                    },
                });

            },
            addQuantity: (id: number) => {
                const product = get().order.products.find((product) => product.product.id === id);
                if (!product) return;
                set({
                    order: {
                        ...get().order,
                        products: get().order.products.map((p) => p.product.id === id ? { ...p, quantity: p.quantity + 1 } : p),
                        count: get().order.count + 1,
                        total: get().order.total + product.product.price,
                    },
                });
            },
            removeQuantity: (id: number) => {
                const product = get().order.products.find((product) => product.product.id === id);
                if (!product) return;
                set({
                    order: {
                        ...get().order,
                        products: get().order.products.map((p) => p.product.id === id ? { ...p, quantity: p.quantity - 1 } : p),
                        count: get().order.count - 1,
                        total: get().order.total - product.product.price,
                    },
                });
            },
            clearOrder: () => set({ order: { products: [], count: 0, total: 0 } }),
        }),
        {
            name: "shop",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)