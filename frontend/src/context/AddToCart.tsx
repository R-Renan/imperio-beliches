import { Product } from "../lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (isOpen: boolean) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,

      toggleCart: (isOpen) => set({ isCartOpen: isOpen }),

      addItem: (product) => {
        let wasSuccessful = false;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );
          const availableQuantity = product.quant;
          const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

          if (newQuantity <= availableQuantity) {
            wasSuccessful = true;
            return {
              items: existingItem
                ? state.items.map((item) =>
                    item.product.id === product.id
                      ? { ...item, quantity: newQuantity }
                      : item
                  )
                : [...state.items, { product, quantity: newQuantity }],
              isCartOpen: true, // Abre o Sheet do carrinho
            };
          }

          return state;
        });

        return wasSuccessful;
      },

      increaseQuantity: (productId) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === Number(productId)
          );

          if (
            existingItem &&
            existingItem.quantity < existingItem.product.quant
          ) {
            return {
              items: state.items.map((item) =>
                item.product.id === Number(productId)
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return state;
        }),

      decreaseQuantity: (productId) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === Number(productId)
          );

          if (existingItem) {
            const newQuantity = existingItem.quantity - 1;
            return {
              items:
                newQuantity > 0
                  ? state.items.map((item) =>
                      item.product.id === Number(productId)
                        ? { ...item, quantity: newQuantity }
                        : item
                    )
                  : state.items.filter(
                      (item) => item.product.id === Number(productId)
                    ),
            };
          }

          return state;
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== Number(productId)
          ),
        })),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter(
                  (item) => item.product.id !== Number(productId)
                )
              : state.items.map((item) =>
                  item.product.id === Number(productId)
                    ? { ...item, quantity }
                    : item
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
