import OfferProducts from "./products/OfferProducts";
import { motion } from "framer-motion";
import { TextEffect } from "./ui/core/text-effect";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="max-padd-container relative w-full mb-14 cursor-default">
      {/* Contêiner para o fundo com altura fixa */}
      <div className="absolute top-0 left-0 w-full h-[744px] bg-hero bg-cover bg-center bg-no-repeat z-[-1] " />

      {/* Contêiner para o conteúdo com altura variável */}
      <div className="relative top-24 w-full h-auto">
        <TextEffect
          className="uppercase medium-18 tracking-wider "
          as="h4"
          per="char"
          preset="fade"
        >
          Colchões & Beliches
        </TextEffect>

        <motion.h2
          className="h1 max-w-[40rem]"
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 0.9 }}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
        >
          Transforme seu sono e seu espaço.{" "}
          <Link to="/todos-produtos" className="text-secondary underline">
            Compre agora
          </Link>{" "}
          e descubra o conforto!
        </motion.h2>
        <p className="my-5 max-w-[33rem]">
          Qualidade e estilo para noites perfeitas.
        </p>

        {/* Em Promoção */}
        <div className="mt-32">
          <OfferProducts />
        </div>
      </div>
    </section>
  );
};

export default Hero;
