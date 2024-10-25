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
import CartItem from "./CartItem";
import CarrinhoVazio from "../../assets/carrinho-vazio.png";

const Cart = () => {
  const { items, itemCount, cartTotal, isCartOpen, toggleCart } = useCart();

  return (
    <>
      <div className="relative cursor-pointer group p-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative">
              <ShoppingCart
                aria-hidden="true"
                className="p-2 h-10 w-10 flex-shrink-0 hover:text-secondary cursor-pointer"
              />
              <span className="absolute -top-2 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onSelect={() => toggleCart(true)}>
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
      </div>

      <Sheet open={isCartOpen} onOpenChange={toggleCart}>
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
              <img src={CarrinhoVazio} alt="CarrinhoVazio" className="w-50" />
              <p className="text-lg">Seu carrinho está vazio.</p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
