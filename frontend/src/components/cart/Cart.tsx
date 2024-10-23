import { ShoppingCart, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o Sheet

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="group -m-2 flex items-center p-2">
            <ShoppingCart
              aria-hidden="true"
              className="p-2 h-10 w-10 flex-shrink-0 group-hover:text-secondary"
            />
            <span className="relative w-5 h-5 -top-2 right-3 ml-2 text-sm font-medium text-tertiary">
              {isMounted ? itemCount : 0}
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          {/* Opção de abrir carrinho */}
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            <div className="flex items-center gap-x-2">
              <ShoppingCart className="h-4 w-4" />
              Ver carrinho ({itemCount})
            </div>
          </DropdownMenuItem>

          {/* Opção de ir para pagamentos */}
          <DropdownMenuItem asChild>
            <Link to="/checkout" className="flex items-center gap-x-2">
              <CreditCard className="h-4 w-4" />
              Ir para o pagamento
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sheet para abrir o carrinho */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          aria-labelledby="cart-title"
          className="flex w-full flex-col pr-0 sm:max-w-lg"
        >
          <SheetHeader className="space-y-2.5 pr-6">
            <SheetTitle id="cart-title">Carrinho ({itemCount})</SheetTitle>
            <SheetDescription>
              Aqui estão os itens do seu carrinho de compras.
            </SheetDescription>
          </SheetHeader>
          {itemCount > 0 ? (
            <>
              <ScrollArea className=" flex w-full flex-col pr-6">
                {items.map(({ product, quantity }) => (
                  <div className="shadow-md my-5">
                    <CartItem
                      product={product}
                      quantity={quantity}
                      key={product.id}
                    />
                  </div>
                ))}
              </ScrollArea>
              <div className="space-y-10 pr-6">
                <Separator />
                <div className="space-y-1.5 text-sm">
                  <div className="flex">
                    <span className="flex-1">Frete:</span>
                    <span>Não calculado</span>
                  </div>
                  <div className="flex">
                    <span className="flex-1 font-bond text-2xl">Total:</span>
                    <span className="font-bold text-2xl">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>
                <SheetFooter className="flex space-x-4">
                  <Link
                    to="/checkout"
                    className={buttonVariants({
                      variant: "link",
                      className:
                        "w-full border bg-secondary border-white  text-white",
                    })}
                  >
                    Fechar pedido
                  </Link>
                  <SheetTrigger asChild>
                    <Link
                      to="/"
                      className={buttonVariants({
                        variant: "link",
                        className:
                          "w-full border border-gray-20  text-secondary",
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
                className="relative mb-4 h-60 w-60 text-secondary"
              >
                <img
                  src="/hippo-empty-cart.png"
                  alt="empty shopping cart hippo"
                  className="object-cover"
                />
              </div>
              <div className="text-xl font-semibold">
                Seu carrinho está vazio
              </div>
              <SheetTrigger asChild>
                <Link
                  to=""
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-secondary",
                  })}
                >
                  Adicione itens ao seu carrinho para finalizar a compra
                </Link>
              </SheetTrigger>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
