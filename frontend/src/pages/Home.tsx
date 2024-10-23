import About from "../components/About";
import Hero from "../components/Hero";
import Offer from "../components/products/Offer";
import SEO from "../components/users/SEO";

const Home = () => {
  return (
    <div>
      <SEO
        title="Império Beliches"
        description="Encontre os melhores colchões e beliches na nossa loja. Ofertas incríveis e entrega rápida, segurança e suporte!"
      />
      <Hero />
      <Offer />
      <About />
    </div>
  );
};

export default Home;
