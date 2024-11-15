import AllProducts from "../components/products/AllProducts";

import SEO from "../components/users/SEO";

const AllProduct = () => {
  return (
    <section>
      <div>
        <SEO
          title="Todos os produtos | Império Beliches"
          description="Encontre os melhores colchões e beliches na nossa loja. Ofertas incríveis e entrega rápida, segurança e suporte!"
        />
        <AllProducts /> {/* Passando a prop onOpenCart */}
      </div>
    </section>
  );
};

export default AllProduct;
