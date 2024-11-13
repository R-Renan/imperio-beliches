import Item from "./Item";
import "swiper/css";
import "swiper/css/autoplay";
import PRODUCTS from "../../assets/all_products";
import { useEffect, useState } from "react";
import SkeletonItem from "./SkeletonItem";
import { TextEffect } from "../ui/core/text-effect";
import { Product } from "../../lib/types";

interface RelevantProductsProps {
  currentProductId: number; // ID do produto atual
  category: string; // Categoria para filtrar produtos relevantes
}

const RelevantProducts = ({
  currentProductId,
  category,
}: RelevantProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    const fetchRelevantProducts = () => {
      setLoading(true);
      const filtered = PRODUCTS.filter(
        (item) =>
          item.category.toString() === category.toString() &&
          item.id !== currentProductId
      )
        .sort(() => Math.random() - 0.5) // Aleatoriza a ordem
        .slice(0, 4); // Limita a 4 produtos

      setFilteredProducts(filtered);
      setNoProducts(filtered.length === 0);
      setLoading(false);
    };

    fetchRelevantProducts();
  }, [currentProductId, category]); // Dependências para atualizar quando mudar o produto atual ou a categoria

  const renderProductItems = () => {
    if (loading || noProducts) {
      return Array.from({ length: 4 }).map((_, index) => (
        <SkeletonItem key={index} loading={true} />
      ));
    }

    return filteredProducts.map(({ id, ...itemProps }) => (
      <Item key={id} {...itemProps} loading={false} id={id} />
    ));
  };

  return (
    <section className="max-padd-container">
      {/* Título */}
      <TextEffect
        className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5"
        as="h4"
        per="char"
        preset="fade"
      >
        Produtos Relevantes
      </TextEffect>

      {/* Skeleton ou Lista de Produtos */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-6">
        {renderProductItems()}
      </div>
    </section>
  );
};

export default RelevantProducts;
