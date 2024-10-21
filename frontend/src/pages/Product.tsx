import AllProducts from "../components/products/AllProducts";
import SEO from "../components/SEO";

const Product = () => {
  return (
    <section>
      <div>
        <SEO
          title="Todos os produtos | Império Beliches"
          description="Encontre os melhores colchões e beliches na nossa loja. Ofertas incríveis e entrega rápida, segurança e suporte!"
        />
        <AllProducts />
      </div>
    </section>
  );
};

export default Product;
