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
import { useCart } from "../../hooks/useCart"; // Importando o hook
import { ScrollArea } from "../ui/scroll-area";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useDropdownMenu } from "../../hooks/useDropdownMenu";

const Cart = () => {
  const { isMounted, itemCount, cartTotal, isOpen, setIsOpen, items } =
    useCart();
  const { isMenuOpen, handleMouseEnter, handleMouseLeave, setIsMenuOpen } =
    useDropdownMenu();

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <div className="rounded-full border -m-2 flex items-center p-2">
            <ShoppingCart
              aria-hidden="true"
              className="p-2 h-9 w-9 flex-shrink-0 hover:text-secondary"
            />
            <span className="relative w-5 h-5 -top-2 right-3 ml-2 text-sm font-medium text-tertiary">
              {isMounted ? itemCount : 0}
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            <div className="flex items-center gap-x-2">
              <ShoppingCart className="h-4 w-4" />
              Ver carrinho ({itemCount})
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/checkout" className="flex items-center gap-x-2">
              <CreditCard className="h-4 w-4" />
              Ir para o pagamento
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          aria-labelledby="cart-title"
          className="flex w-full flex-col pr-0 sm:max-w-lg"
        >
          <SheetHeader>
            <SheetTitle>Carrinho ({itemCount})</SheetTitle>
            <SheetDescription>Seus itens selecionados.</SheetDescription>
          </SheetHeader>

          {itemCount > 0 ? (
            <>
              <ScrollArea className="flex w-full flex-col pr-6">
                {items.map(({ product, quantity }) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                  />
                ))}
              </ScrollArea>
              <Separator />
              <div className="space-y-4 pr-6">
                <div className="flex justify-between text-lg">
                  <span>Total:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <SheetFooter className="flex space-x-4">
                  <Link
                    to="/checkout"
                    className={buttonVariants({
                      variant: "link",
                      className: "w-full bg-secondary text-white",
                    })}
                  >
                    Fechar pedido
                  </Link>
                  <SheetTrigger asChild>
                    <Link
                      to="/"
                      className={buttonVariants({
                        variant: "link",
                        className: "w-full text-secondary",
                      })}
                    >
                      Continuar comprando
                    </Link>
                  </SheetTrigger>
                </SheetFooter>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
              <img
                src="/hippo-empty-cart.png"
                alt="Carrinho vazio"
                className="w-40"
              />
              <p className="text-lg">Seu carrinho está vazio.</p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
