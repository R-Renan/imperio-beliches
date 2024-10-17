import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { Star, Share } from "lucide-react";
import { Button } from "./ui/button";
import "swiper/css";
import "swiper/css/autoplay";

import LATEST from "../assets/latest";

const RelatedProducts = () => {
  return (
    <div>
      <h4 className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5">
        Novidades
      </h4>
      <div className="mx-auto max-w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Pausa o autoplay ao passar o mouse
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
          className="h-[422px] sm:h-[477px] mt-5"
        >
          {LATEST.map((item, i) => (
            <SwiperSlide key={i} className="relative group">
              <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[390px] w-[250px]">
                {/* Imagem */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Ícones de Ação - Mostrar ao passar o mouse */}
                <div className="top-1 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className="text-gray-500 hover:text-yellow-500 transition-colors duration-300 cursor-pointer" />
                  <Share className="text-gray-500 hover:text-green-500 transition-colors duration-300 cursor-pointer" />
                </div>

                {/* Informações do Produto */}
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    Descrição
                  </p>

                  {/* Preço */}
                  <div className="flex flex-col items-center mt-2">
                    <span className="text-red-500 font-bold text-lg">
                      R$ {item.new_price}.00
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      R$ {item.old_price}.00
                    </span>
                  </div>

                  {/* Botão Ver Detalhes */}
                  <Link to={`/product/${item.id}`}>
                    <Button
                      variant="link"
                      className="mt-3 flex items-center gap-2 text-muted-foreground"
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
