import { Button } from "./ui/button";
import { useState } from "react";
import { ShoppingCart, LoaderCircle } from "lucide-react";
import { toast } from "sonner"; // Biblioteca de notificações
import { BorderTrail } from "./core/border-trail"; // Animação de borda
import { Link } from "react-router-dom";

interface ItemProps {
  id: number;
  name: string;
  desc: string;
  category: number;
  category_name: string;
  rating: number;
  quant: number;
  quantvend: number;
  unit: string;
  image: string;
  price: number;
  parc: boolean;
  parc_quant: number;
  price_unit: number;
  free_shipping: boolean;
  offer: boolean;
  porc_offer: number;
  offer_price: number;
  old_price: number;
  loading?: boolean;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className="text-yellow-300 text-2xl">
        ★
      </span>
    );
  }

  for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
    stars.push(
      <span key={`empty-${i}`} className="text-2xl">
        ☆
      </span>
    );
  }

  return stars;
};

const Items = ({
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
}: ItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const displayedPrice = offer ? offer_price : price;

  const handleAnimationComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    setIsVisible(true);

    // Simulação de adicionar ao carrinho
    setTimeout(() => {
      toast.success(`${name} foi adicionado ao carrinho!`);
      setIsLoading(false);
      setIsVisible(false);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Animação de borda que envolve o card completo */}

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

        {/* Badge de Promoção */}
        {offer && (
          <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-md">
            {porc_offer}% OFF
          </span>
        )}

        {/* Imagem */}
        <img
          src={image}
          alt={name}
          className="rounded-lg w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Informações do Produto */}
        <div className="flex flex-col items-center text-center flex-grow">
          <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {name}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-1">{desc}</p>

          {/* Avaliação (Estrelas) */}
          <div className="flex mt-4">{renderStars(rating)}</div>

          {/* Preço e Promoção */}
          <div className="flex flex-col items-center mt-2">
            {offer ? (
              <>
                <span className="text-green-500 font-bold text-lg">
                  por R$ {offer_price}.00
                </span>
              </>
            ) : (
              <span className="text-destructive font-bold text-lg">
                por R$ {price}.00
              </span>
            )}

            {/* Parcelamento Condicional */}
            <p className="text-gray-400 text-sm">
              até <span className="text-destructive">{parc_quant}x</span> de R${" "}
              {(displayedPrice / parc_quant).toFixed(2)} sem juros
            </p>
          </div>
        </div>

        {/* Botões de Ações */}
        <div className="w-full flex justify-between items-center mt-auto">
          {/* Botão Ver Detalhes */}
          <Link to={`/product/${id}`} className="flex-grow">
            <Button
              variant="link"
              className="w-full text-muted-foreground hover:text-secondary"
            >
              Ver Detalhes
            </Button>
          </Link>

          {/* Botão Adicionar ao Carrinho (somente ícone) */}
          <Button
            variant="link"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="ml-2 p-2 text-muted-foreground hover:text-green-500"
          >
            {isLoading ? (
              <LoaderCircle className="w-5 h-5 text-green-500 animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Items;
