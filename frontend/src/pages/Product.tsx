import ProductHd from "../components/products/ProductHd";
import { useParams } from "react-router-dom";
import SEO from "../components/users/SEO";
import PRODUCTS from "../assets/all_products";
import NotFound from "../components/NotFound";
import ProductDisplay from "../components/products/ProductDisplay";
import ProductDescription from "../components/products/ProductDescription";
import RelevantProducts from "../components/products/RelevantProducts"; // Importe o novo componente

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
        {/* Adicione o componente de Produtos Relevantes */}
        <RelevantProducts
          currentProductId={product.id}
          category={String(product.category)}
        />
      </div>
    </section>
  );
};

export default Product;
