import PRODUCT from "../../assets/all_products";
import { useCart } from "../../context/AddToCart";
import { formatPrice } from "../../lib/utils";
import { Product } from "../../lib/types";
import { ImageIcon, X } from "lucide-react";

const CartItem = ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => {
  const image = product.image;
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  const label =
    PRODUCT.find(({ category }) => category === product.category)
      ?.category_name || "Unknown Label";

  return (
    <div className="space-y-3 py-2" role="listitem">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image === "string" && image ? (
              <img
                src={image}
                alt={product.name}
                className="absolute object-cover"
                aria-label={product.name}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>

            <div className="flex items-center mt-2">
              <button
                onClick={() => decreaseQuantity(product.id.toString())}
                className="px-2"
                aria-label={`Diminuir quantidade de ${product.name}`}
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button
                onClick={() => increaseQuantity(product.id.toString())}
                className="px-2"
                aria-label={`Aumentar quantidade de ${product.name}`}
              >
                +
              </button>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id.toString())}
                className="flex items-center gap-0.5"
                aria-label={`Remover ${product.name} do carrinho`}
              >
                <X className="w-3 h-4" />
                Remover
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price * quantity)} {/* Preço total */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
