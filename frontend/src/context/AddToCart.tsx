import { Product } from "../lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => boolean; // Retorna um booleano
  removeItem: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => {
        let wasSuccessful = false; // Variável para armazenar o resultado

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          const availableQuantity = product.quant;
          const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

          if (newQuantity <= availableQuantity) {
            wasSuccessful = true; // Atualiza a variável para sucesso
            return {
              items: existingItem
                ? state.items.map((item) =>
                    item.product.id === product.id
                      ? { ...item, quantity: newQuantity }
                      : item
                  )
                : [...state.items, { product, quantity: newQuantity }],
            };
          }

          return state; // Caso a adição falhe, mantém o estado inalterado
        });

        return wasSuccessful; // Retorna o resultado da operação
      },
      increaseQuantity: (id) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === Number(id)
          );
          const product = existingItem?.product;

          if (
            existingItem &&
            product &&
            existingItem.quantity < product.quant
          ) {
            return {
              items: state.items.map((item) =>
                item.product.id === Number(id)
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return state; // Retorna o estado inalterado se o estoque estiver cheio
        }),
      decreaseQuantity: (id) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === Number(id)
          );
          if (existingItem && existingItem.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item.product.id === Number(id)
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          } else {
            return {
              items: state.items.filter(
                (item) => item.product.id !== Number(id)
              ),
            };
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== Number(id)),
        })),
      setQuantity: (id, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return {
              items: state.items.filter(
                (item) => item.product.id !== Number(id)
              ),
            };
          }
          return {
            items: state.items.map((item) =>
              item.product.id === Number(id) ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
