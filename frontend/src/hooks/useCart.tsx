import { useState, useEffect } from "react";
import { useCart as useCartContext } from "./../context/AddToCart";

export const useCart = () => {
  const { items } = useCartContext();
  const itemCount = items.length;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  return { isMounted, itemCount, cartTotal, isOpen, setIsOpen, items };
};
