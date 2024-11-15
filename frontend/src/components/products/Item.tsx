import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { BorderTrail } from "../ui/core/border-trail";

import { Product } from "../../lib/types";
import { formatPrice } from "../../lib/utils";

interface ItemProps extends Product {
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

const Item = (props: ItemProps) => {
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

  const displayedPrice = offer ? offer_price : price;

  return (
    <div className="flex flex-col justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative h-[400px] w-[250px] cursor-default">
      {/* Borda azul */}
      <BorderTrail
        className="bg-gradient-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
        size={120}
      />

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
          <span
            className={`font-bold text-lg ${
              offer ? "text-green-500" : "text-destructive"
            }`}
          >
            por {offer ? formatPrice(offer_price) : formatPrice(price)}
          </span>

          {/* Parcelamento Condicional */}
          <p className="text-gray-400 text-sm">
            até <span className="text-destructive">{parc_quant}x</span> de R${" "}
            {(displayedPrice / parc_quant).toFixed(2)} sem juros
          </p>
        </div>
      </div>

      {/* Botão Ver Detalhes (fixado no final) */}
      <div className="w-full flex justify-center mt-auto">
        <Link to={`/produto/${id}`}>
          <Button
            variant="link"
            className="w-full text-muted-foreground underline hover:text-secondary transition-transform duration-300 hover:scale-105"
          >
            Ver Detalhes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Item;
