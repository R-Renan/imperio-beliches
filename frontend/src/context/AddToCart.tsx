// Importações necessárias
import { Product } from "../lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Tipo de item do carrinho
export type CartItem = {
  product: Product;
  quantity: number;
};

// Definindo o estado do carrinho
type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  itemCount: number;
  cartTotal: number;
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (isOpen: boolean) => void;
};

// Criando o estado do Zustand
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      itemCount: 0,
      cartTotal: 0,

      // Função para alternar o estado do carrinho (aberto ou fechado)
      toggleCart: (isOpen) => set({ isCartOpen: isOpen }),

      // Adiciona um item ao carrinho
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
            const updatedItems = existingItem
              ? state.items.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: newQuantity }
                    : item
                )
              : [...state.items, { product, quantity: newQuantity }];

            return {
              items: updatedItems,
              isCartOpen: true,
              itemCount: updatedItems.reduce(
                (count, item) => count + item.quantity,
                0
              ),
              cartTotal: updatedItems.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              ),
            };
          }

          return state;
        });

        return wasSuccessful;
      },

      // Função para aumentar a quantidade de um item no carrinho
      increaseQuantity: (productId) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === Number(productId)
          );

          if (
            existingItem &&
            existingItem.quantity < existingItem.product.quant
          ) {
            const updatedItems = state.items.map((item) =>
              item.product.id === Number(productId)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );

            return {
              items: updatedItems,
              itemCount: updatedItems.reduce(
                (count, item) => count + item.quantity,
                0
              ),
              cartTotal: updatedItems.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              ),
            };
          }

          return state;
        }),

      // Função para diminuir a quantidade de um item no carrinho
      decreaseQuantity: (productId) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === Number(productId)
          );

          if (existingItem) {
            const newQuantity = existingItem.quantity - 1;
            const updatedItems =
              newQuantity > 0
                ? state.items.map((item) =>
                    item.product.id === Number(productId)
                      ? { ...item, quantity: newQuantity }
                      : item
                  )
                : state.items.filter(
                    (item) => item.product.id !== Number(productId)
                  );

            return {
              items: updatedItems,
              itemCount: updatedItems.reduce(
                (count, item) => count + item.quantity,
                0
              ),
              cartTotal: updatedItems.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              ),
            };
          }

          return state;
        }),

      // Função para remover um item do carrinho
      removeItem: (productId) =>
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.product.id !== Number(productId)
          );

          return {
            items: updatedItems,
            itemCount: updatedItems.reduce(
              (count, item) => count + item.quantity,
              0
            ),
            cartTotal: updatedItems.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            ),
          };
        }),

      // Função para limpar o carrinho
      clearCart: () =>
        set({
          items: [],
          itemCount: 0,
          cartTotal: 0,
        }),

      // Função para definir a quantidade de um item
      setQuantity: (productId, quantity) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.product.id === Number(productId) ? { ...item, quantity } : item
          );

          return {
            items: updatedItems,
            itemCount: updatedItems.reduce(
              (count, item) => count + item.quantity,
              0
            ),
            cartTotal: updatedItems.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            ),
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
