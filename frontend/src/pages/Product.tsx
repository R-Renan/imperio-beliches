import ProductHd from "../components/products/ProductHd";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import PRODUCTS from "../assets/all_products";
import NotFound from "../components/NotFound";
import ProductDisplay from "../components/products/ProductDisplay";
import ProductDescription from "../components/products/ProductDescription";
import PopularProducts from "../components/products/PopularProducts";

const Product = () => {
  const { productId } = useParams<{ productId: string }>();

  const product = PRODUCTS.find((e) => e.id === Number(productId));
  if (!product) {
    return <NotFound />;
  }

  return (
    <section>
      <div>
        <SEO
          title={`${product.name} | Império Beliches`}
          description={`Encontre o ${product.name} e outros colchões e beliches na nossa loja. Ofertas incríveis e entrega rápida, segurança e suporte!`}
        />
        <ProductHd {...product} />
        <ProductDisplay {...product} />
        <ProductDescription />
        <PopularProducts />
      </div>
    </section>
  );
};

export default Product;
