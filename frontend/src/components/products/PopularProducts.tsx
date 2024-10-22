import Item from "../Item";
import "swiper/css";
import "swiper/css/autoplay";
import PRODUCTS from "../../assets/all_products";
import { useEffect, useState } from "react";
import SkeletonItem from "../SkeletonItem";
import { TextEffect } from "../ui/core/text-effect";

import { Product } from "../../lib/types";

const PopularProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = () => {
      setLoading(true);
      const filtered = PRODUCTS.filter((item) => item.rating === 5)
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      setFilteredProducts(filtered);
      setNoProducts(filtered.length === 0);
      setLoading(false);
    };

    fetchFilteredProducts();
  }, []);

  const renderProductItems = () => {
    if (loading || noProducts) {
      return Array.from({ length: 8 }).map((_, index) => (
        <SkeletonItem key={index} loading={true} />
      ));
    }

    return filteredProducts.map(({ id, ...itemProps }) => (
      <Item key={id} {...itemProps} loading={false} id={id} />
    ));
  };

  return (
    <section className="mx-auto max-w-full">
      {/* Título */}
      <TextEffect
        className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5"
        as="h4"
        per="char"
        preset="fade"
      >
        Populares
      </TextEffect>

      {/* Skeleton ou Lista de Produtos */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-6">
        {renderProductItems()}
      </div>
    </section>
  );
};

export default PopularProducts;
