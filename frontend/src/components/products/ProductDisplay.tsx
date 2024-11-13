import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "../ui/button"; // Componente do shadcn/ui
import { Product } from "../../lib/types";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { formatPrice } from "../../lib/utils";

import { useCart } from "../../context/AddToCart";
import { Store } from "react-notifications-component";
import "animate.css";

const ProductDisplay = (props: Product) => {
  const { name, price, old_price } = props;

  const imagePlaceholders = [
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
    "https://fakeimg.pl/500x500",
  ];

  const [selectedImage, setSelectedImage] = useState(imagePlaceholders[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const { addItem, toggleCart } = useCart();

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left;
    const y = e.pageY - top;
    setZoomPosition({ x, y });
  };

  return (
    <section className="max-w-screen-lg mx-auto flex flex-col lg:flex-row gap-8 py-8 px-6">
      {/* Imagens do Produto (esquerda) */}
      <div className="flex gap-6 flex-col lg:flex-row">
        <ScrollArea className="h-[450px] w-[90px]">
          <div className="flex flex-col gap-4">
            {imagePlaceholders.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`productImg-${idx}`}
                className="h-20 w-20 rounded-lg object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
        </ScrollArea>
        <div
          className="relative w-full h-[450px] overflow-hidden rounded-lg shadow-lg bg-white"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <img
            src={selectedImage}
            alt="bigImg"
            className="w-full h-full object-cover"
          />
          {isZoomed && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: "200%",
                backgroundPosition: `${(zoomPosition.x / 450) * 100}% ${
                  (zoomPosition.y / 450) * 100
                }%`,
              }}
            ></div>
          )}
        </div>
      </div>

      {/* Detalhes do Produto (direita) */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 mb-4">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-yellow-500">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="w-5 h-5" />
          ))}
          <p className="text-gray-600">(223 reviews)</p>
        </div>

        <div className="flex items-baseline gap-6 my-4">
          <div className="text-3xl font-bold text-gray-800">
            {formatPrice(price)}
          </div>
          <div className="text-xl font-medium line-through text-red-500">
            {formatPrice(old_price)}
          </div>
        </div>
        <Separator />

        <div className="my-6">
          <p>Descrição resumida</p>
        </div>

        {/* <div className="my-6">
          <h4 className="text-lg font-semibold text-gray-800">Select Color:</h4>
          <div className="flex gap-3 my-3">
            {["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"].map(
              (color, idx) => (
                <div
                  key={idx}
                  className={`ring-2 ring-gray-300 h-10 w-10 rounded-full cursor-pointer ${color} hover:scale-110 transition-transform`}
                ></div>
              )
            )}
          </div>
        </div> */}

        {/* <div className="my-6">
          <h4 className="text-lg font-semibold text-gray-800">Select Size:</h4>
          <div className="flex gap-3 my-3">
            {["S", "M", "L", "XL"].map((size, idx) => (
              <div
                key={idx}
                className="ring-2 ring-gray-300 h-10 w-10 flex items-center justify-center cursor-pointer rounded-md font-semibold hover:ring-gray-400 transition-colors"
              >
                {size}
              </div>
            ))}
          </div>
        </div> */}

        <div className="flex gap-4 mb-6">
          <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-md py-3 transition-all">
            Adicione ao carrinho
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          <span className="font-medium">Category:</span> Categoria |
          SubCategoria | Variante
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Tags:</span> Tag 1 | Tag 2 | Tag 3
        </p>
      </div>
    </section>
  );
};

export default ProductDisplay;
