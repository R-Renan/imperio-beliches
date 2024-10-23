import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import { LoaderCircle, Plus } from "lucide-react";
import { BorderTrail } from "../ui/core/border-trail";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Product } from "../../lib/types";
import { formatPrice } from "../../lib/utils";
import { useCart } from "../../context/AddToCart";
import { Store } from "react-notifications-component";
import "animate.css";

interface ItemsProps extends Product {
  loading?: boolean;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-2xl ${
        i < fullStars ? "text-yellow-300" : "text-gray-400"
      }`}
    >
      {i < fullStars || (i === fullStars && halfStar) ? "★" : "☆"}
    </span>
  ));
};

const Items = (props: ItemsProps) => {
  const {
    id,
    name,
    desc,
    image,
    price,
    rating,
    parc_quant,
    offer,
    porc_offer,
    offer_price,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const displayedPrice = offer ? offer_price : price;
  const { addItem, toggleCart } = useCart();

  const handleAnimationComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleAddToCart = useCallback(() => {
    const productToAdd = {
      ...props,
      price: props.offer ? props.offer_price : props.price,
    };
    setIsLoading(true);
    setIsVisible(true);

    setTimeout(() => {
      const wasSuccessful = addItem(productToAdd);

      if (wasSuccessful) {
        Store.addNotification({
          title: "Sucesso!",
          message: `${productToAdd.name} foi adicionado ao carrinho!`,
          type: "success",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__bounceIn"],
          animationOut: ["animate__animated", "animate__bounceOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        toggleCart(true); // Abre o Cart
      } else {
        Store.addNotification({
          title: "Erro",
          message: `Não há mais itens em estoque!`,
          type: "danger",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__bounceIn"],
          animationOut: ["animate__animated", "animate__bounceOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      }

      setIsLoading(false);
      setIsVisible(false);
    }, 1500);
  }, [addItem, props, toggleCart]);

  return (
    <div className="relative">
      <div className="flex flex-col justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative h-[400px] w-[250px] cursor-default">
        {isVisible && (
          <BorderTrail
            className="absolute inset-0 bg-gradient-to-l from-green-300 via-green-500 to-green-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-green-500 dark:to-green-700/30 rounded-lg"
            size={120}
            transition={{
              ease: [0, 0.5, 0.8, 0.5],
              duration: 4,
              repeat: 2,
            }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
        {offer && (
          <Badge
            variant={"default"}
            className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-md hover:bg-blue-400"
          >
            {porc_offer}% OFF
          </Badge>
        )}
        <img
          src={image}
          alt={name}
          className="rounded-lg w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="flex flex-col items-center text-center flex-grow">
          <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {name}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-1">{desc}</p>
          <div className="flex mt-4">{renderStars(rating)}</div>
          <div className="flex flex-col items-center mt-2">
            {offer ? (
              <span className="text-green-500 font-bold text-lg">
                por {formatPrice(offer_price)}
              </span>
            ) : (
              <span className="text-destructive font-bold text-lg">
                por {formatPrice(price)}
              </span>
            )}
            <p className="text-gray-400 text-sm">
              até <span className="text-destructive">{parc_quant}x</span> de R${" "}
              {(displayedPrice / parc_quant).toFixed(2)} sem juros
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-auto">
          <Link to={`/produto/${id}`} className="flex-grow">
            <Button
              variant="outline"
              className="w-full bg-white text-muted-foreground hover:text-secondary transition-transform duration-300 hover:scale-105"
            >
              Ver Detalhes
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="ml-2 p-2 text-muted-foreground bg-white hover:text-green-500 transition-transform duration-300 hover:scale-105"
          >
            {isLoading ? (
              <LoaderCircle className="w-5 h-5 text-green-500 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Items;
