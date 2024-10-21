import { useEffect, useState, useMemo } from "react";
import PRODUCTS from "../assets/all_products";
import Items from "../components/Items";
import SkeletonItem from "../components/SkeletonItem";
import Pagination from "../components/Pagination";
import SEO from "../components/SEO";

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

const ForCategory: React.FC<{ banner: string; category: string }> = ({
  banner,
  category,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);

    const filtered = PRODUCTS.filter((item) => item.category_name === category);

    setTimeout(() => {
      setFilteredProducts(filtered);
      setLoading(false);
      setCurrentPage(1);
    }, 500);
  }, [category]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <SEO
        title={`Colchões e Beliches | ${category}`}
        description="Encontre os melhores colchões e beliches na nossa loja. Ofertas incríveis e entrega rápida, segurança e suporte!"
      />
      <section className="max-padd-container">
        <div>
          <div className="pt-6">
            <img src={banner} alt="banner" className="block mb-7 mx-auto" />
          </div>

          <h4 className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5">
            {category}
          </h4>

          {loading ? (
            <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gao-y-28 mt-20">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonItem key={index} loading={true} />
              ))}
            </div>
          ) : (
            <div className="flexBetween my-5 mx-2">
              <h5>
                <span className="font-bold">
                  Mostrando{" "}
                  {currentPage > 1 ? (currentPage - 1) * itemsPerPage + 1 : 1}-
                  {currentPage * itemsPerPage > filteredProducts.length
                    ? filteredProducts.length
                    : currentPage * itemsPerPage}
                </span>{" "}
                de {filteredProducts.length} produtos
              </h5>
            </div>
          )}

          {/* Container de produtos */}
          <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gao-y-28 mt-20">
            {currentProducts.map((item) => (
              <Items key={item.id} {...item} loading={false} />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ForCategory;
