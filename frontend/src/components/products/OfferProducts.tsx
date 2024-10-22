import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Item from "../Item";
import "swiper/css";
import "swiper/css/autoplay";
import PRODUCTS from "../../assets/all_products";
import { useEffect, useState } from "react";
import SkeletonItem from "../SkeletonItem";
import { TextEffect } from "../core/text-effect";

import { Product } from "../../lib/types";

const OfferProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = () => {
      setLoading(true);
      const filtered = PRODUCTS.filter((item) => item.offer);
      setFilteredProducts(filtered);
      setNoProducts(filtered.length === 0);
      setLoading(false);
    };

    fetchFilteredProducts();
  }, []);

  const renderProductSlides = () => {
    if (loading || noProducts) {
      return Array.from({ length: 8 }).map((_, index) => (
        <SwiperSlide key={index}>
          <SkeletonItem loading={true} />
        </SwiperSlide>
      ));
    }

    return filteredProducts.map(({ id, ...itemProps }) => (
      <SwiperSlide key={id} className="relative group">
        <Item {...itemProps} loading={false} id={id} />
      </SwiperSlide>
    ));
  };

  return (
    <div>
      <TextEffect
        className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5"
        as="h4"
        per="char"
        preset="fade"
      >
        Em Promoção
      </TextEffect>
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
          {renderProductSlides()}
        </Swiper>
      </div>
    </div>
  );
};

export default OfferProducts;
