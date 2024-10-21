import React, { useState, useRef } from "react";
import { motion, MotionConfig } from "framer-motion";
import useClickOutside from "../hooks/useClickOutside";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import PRODUCTS from "../assets/all_products"; // Importar a lista de produtos
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
};

const SearchButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<typeof PRODUCTS>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setSearchQuery("");
    setFilteredProducts([]);
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.length > 2) {
      const filtered = PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <MotionConfig transition={transition}>
      <div className="relative" ref={containerRef}>
        <motion.div
          animate={{ width: isOpen ? "300px" : "40px" }}
          initial={false}
          className="overflow-hidden flex items-center"
        >
          {!isOpen ? (
            <Button
              variant={"default"}
              className="flex items-center justify-center text-black rounded-lg px-3 py-1 focus:outline-none"
              onClick={() => setIsOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          ) : (
            <div className="flex items-center space-x-2 p-2 w-full">
              <Button
                className="flex h-9 w-9 items-center justify-center text-black rounded-full  focus:outline-none"
                onClick={() => setIsOpen(false)}
                aria-label="Back"
              >
                <ArrowLeft />
              </Button>
              <Input
                type="text"
                className="h-9 w-full rounded-lg border-none bg-transparent p-2 focus:outline-none"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />
            </div>
          )}
        </motion.div>
        {isOpen && filteredProducts.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-10 max-h-150 overflow-hidden">
            <ScrollArea className="h-60">
              {" "}
              {filteredProducts.map((product) => (
                <Link
                  to={`/produto/${product.id}`}
                  key={product.id}
                  className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">{product.desc}</p>
                  </div>
                </Link>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </MotionConfig>
  );
};

export default SearchButton;
