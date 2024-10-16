import { Swiper, SwiperSlide } from "swiper/react";
import LATEST from "../assets/latest";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";

const RelatedProducts = () => {
  return (
    <div>
      <h4>Related Products</h4>
      <div>
        <Swiper>
          {LATEST.map((item, i) => (
            <SwiperSlide key={i}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
