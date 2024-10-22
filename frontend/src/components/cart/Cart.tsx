import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { formatPrice } from "../../lib/utils";
import { buttonVariants } from "../ui/button";
import { useCart } from "../../context/AddToCart";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Importando o VisuallyHidden
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="group -m-2 flex items-center p-2">
          <ShoppingCart
            aria-hidden="true"
            className="p-2 h-10 w-10 flex-shrink-0 group-hover:text-secondary"
          />
          <span className="relative rounded-full bg-secondary w-5 h-5 -top-2 right-3 ml-2 text-sm font-medium text-white">
            {isMounted ? itemCount : 0}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent
        aria-labelledby="cart-title"
        className="flex w-full flex-col pr-0 sm:max-w-lg"
      >
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle id="cart-title">
            <VisuallyHidden>Carrinho ({itemCount})</VisuallyHidden>{" "}
            {/* Título oculto para acessibilidade */}
          </SheetTitle>
          <SheetDescription>
            Aqui estão os itens do seu carrinho de compras.
          </SheetDescription>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex w-full flex-col pr-6">
              {items.map(({ product, quantity }) => (
                <CartItem
                  product={product}
                  quantity={quantity}
                  key={product.id}
                />
              ))}
            </ScrollArea>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Frete:</span>
                  <span>Não calculado</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <SheetFooter className="flex space-x-4">
                <Link
                  to="/checkout"
                  className={buttonVariants({ className: "w-full" })}
                >
                  Ir para o pagamento
                </Link>
                <SheetTrigger asChild>
                  <Link
                    to="/"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  >
                    Continuar comprando
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <img
                src="/hippo-empty-cart.png"
                alt="empty shopping cart hippo"
                className="object-cover"
              />
            </div>
            <div className="text-xl font-semibold">Seu carrinho está vazio</div>
            <SheetTrigger asChild>
              <Link
                to=""
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Adicione itens ao seu carrinho para finalizar a compra
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
