import { ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface ItemProps {
  id: number;
  name: string;
  category: number;
  rating: number;
  image: string;
  new_price: number;
  old_price: number;
}

// Função para renderizar estrelas baseado no rating
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating); // Estrelas completas
  const halfStar = rating % 1 >= 0.5; // Verifica se tem meia estrela

  const stars = [];

  // Adicionar estrelas completas
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} size={16} className="text-yellow-500" />
    );
  }

  // Adicionar meia estrela, se necessário
  if (halfStar) {
    stars.push(<Star key="half" size={16} className="text-yellow-500" />);
  }

  // Completar com estrelas vazias
  for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
    stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
  }

  return stars;
};

const Item = ({ id, name, image, new_price, rating }: ItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative h-[390px] w-[250px]">
      {/* Imagem */}
      <img
        src={image}
        alt={name}
        className="rounded-lg w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Informações do Produto */}
      <div className="flex flex-col items-center text-center">
        <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {name}
        </h4>
        <p className="text-xs text-gray-500 line-clamp-1">Descrição</p>

        {/* Avaliação (Estrelas) */}
        <div className="flex mt-1">{renderStars(rating)}</div>

        {/* Preço */}
        <div className="flex flex-col items-center mt-2">
          <span className="text-red-500 font-bold text-lg">
            por R$ {new_price}.00
          </span>
          <p className="text-gray-400 text-sm">
            até<span className="text-destructive"> x12 </span>de R$ 00.00 sem
            juros
          </p>
        </div>

        {/* Botão carrinho */}
        <Link to={`/product/${id}`}>
          <Button variant="secondary" className="mt-10 flex items-center gap-2">
            Adicionar ao carrinho
            <ShoppingCart />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Item;
