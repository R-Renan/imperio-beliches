import ProductHd from "../components/products/ProductHd";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import all_products from "../assets/all_products";
import NotFound from "../components/NotFound";

const Products = () => {
  const { productId } = useParams();
  console.log("productId:", productId);

  const products = all_products.find((e) => e.id === Number(productId));
  if (!products) {
    return <NotFound />;
  }

  return (
    <section>
      <div>
        <SEO
          title="Todos os produtos | Império Beliches"
          description="Encontre os melhores colchões e beliches na nossa loja. Ofertas incríveis e entrega rápida, segurança e suporte!"
        />
        <ProductHd />
      </div>
    </section>
  );
};

export default Products;
