import { Link } from "react-router-dom";
import OfferProducts from "./products/OfferProducts";
import { motion } from "framer-motion";
import { TextEffect } from "./core/text-effect";
import { ArrowRight } from "lucide-react";

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 0.9 }}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
        >
          Transforme seu sono e seu espaço.{" "}
          <span className="text-secondary">Compre agora</span> e descubra o
          conforto!
        </motion.h2>
        <p className="my-5 max-w-[33rem]">
          Qualidade e estilo para noites perfeitas.
        </p>

        {/* Botões */}
        <div className="inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl">
          <div className="text-center regular-14 leading-tight pl-5">
            <h5 className="uppercase font-bold">Crie sua conta</h5>
            <p className="regular-14">Clique aqui</p>
          </div>
          <Link to={"/"} className="btn-dark rounded-xl flexCenter py-5 ">
            <ArrowRight className="text-primary" />
          </Link>
        </div>

        {/* Em Promoção */}
        <div className="mt-32">
          <OfferProducts />
        </div>
      </div>
    </section>
  );
};

export default Hero;
