import { Link } from "react-router-dom";
import PopularProducts from "./PopularProducts";
import { motion } from "framer-motion";
import { TextEffect } from "./core/text-effect";

const Offer = () => {
  return (
    <section className="max-padd-container relative w-full mb-24">
      {/* Contêiner para o fundo com altura fixa */}
      <div className="absolute top-0 left-0 w-full h-[620px] bg-banneroffer bg-cover bg-center bg-no-repeat z-[-1]" />

      {/* Contêiner para o conteúdo com altura variável */}
      <div className="relative top-24 xs:top-32 w-full h-auto">
        <TextEffect
          className="uppercase medium-18 tracking-wider cursor-default"
          as="h4"
          per="char"
          preset="fade"
        >
          Black Friday Saldão!
        </TextEffect>
        <motion.h2
          className="h1 max-w-[40rem] cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 0.9 }}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
        >
          Aproveite até{" "}
          <span className="text-secondary bg-[#FDF660] rounded-full text-[2.75rem] px-2 py-1">
            20% OFF
          </span>{" "}
          em todos os colchões!
        </motion.h2>

        {/* Botões */}
        <div className="inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl">
          <div className="text-center regular-14 leading-tight pl-5">
            <h5 className="uppercase font-bold"></h5>
            <p className="regular-14"></p>
          </div>
          <Link
            to={"/"}
            className="btn-dark rounded-xl flexCenter !py-5"
          ></Link>
        </div>

        {/* Em Promoção */}
        <div className="mt-40">
          <PopularProducts />
        </div>
      </div>
    </section>
  );
};

export default Offer;
