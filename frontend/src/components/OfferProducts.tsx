import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Item from "./Item";
import "swiper/css";
import "swiper/css/autoplay";
import PRODUCTS from "../assets/all_products";
import { useEffect, useState } from "react";
import SkeletonItem from "./SkeletonItem";

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

const OfferProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNoProducts(false);

    const filtered = PRODUCTS.filter((item) => item.offer === true);

    setFilteredProducts(filtered);
    setNoProducts(filtered.length === 0);
    setLoading(false);
  }, []);

  return (
    <div>
      <h4 className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5">
        Em Promoção
      </h4>
      <div className="mx-auto max-w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="h-[415px] mt-5"
        >
          {loading || noProducts
            ? Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonItem loading={true} />
                </SwiperSlide>
              ))
            : filteredProducts.map((item) => (
                <SwiperSlide key={item.id} className="relative group">
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
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OfferProducts;
