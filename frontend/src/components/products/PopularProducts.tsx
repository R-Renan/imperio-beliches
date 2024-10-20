import Item from "../Item";
import "swiper/css";
import "swiper/css/autoplay";
import PRODUCTS from "../../assets/all_products";
import { useEffect, useState } from "react";
import SkeletonItem from "../SkeletonItem";
import { TextEffect } from "../core/text-effect";

interface Product {
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
}

const PopularProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNoProducts(false);

    let filtered = PRODUCTS.filter((item) => item.rating === Number(5));

    filtered = filtered.sort(() => Math.random() - 0.5);

    filtered = filtered.slice(0, 8);

    setFilteredProducts(filtered);
    setNoProducts(filtered.length === 0);
    setLoading(false);
  }, []);

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
        {loading || noProducts
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonItem key={index} loading={true} />
            ))
          : filteredProducts.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                desc={item.desc}
                category={item.category}
                category_name={item.category_name}
                rating={item.rating}
                quant={item.quant}
                quantvend={item.quantvend}
                unit={item.unit}
                image={item.image}
                price={item.price}
                parc={item.parc}
                parc_quant={item.parc_quant}
                price_unit={item.price_unit}
                free_shipping={item.free_shipping}
                offer={item.offer}
                porc_offer={item.porc_offer}
                offer_price={item.offer_price}
                old_price={item.old_price}
                loading={false}
              />
            ))}
      </div>
    </section>
  );
};

export default PopularProducts;
