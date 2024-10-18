import { Link } from "react-router-dom";
import OfferProducts from "./OfferProducts";

const Hero = () => {
  return (
    <section className="max-padd-container relative w-full mb-24">
      {/* Contêiner para o fundo com altura fixa */}
      <div className="absolute top-0 left-0 w-full h-[744px] bg-hero bg-cover bg-center bg-no-repeat z-[-1]" />

      {/* Contêiner para o conteúdo com altura variável */}
      <div className="relative top-24 xs:top-32 w-full h-auto">
        <h4 className="uppercase medium-18 tracking-wider">
          Colchões & Beliches
        </h4>
        <h2 className="h1 max-w-[40rem]">
          Transforme seu sono e seu espaço.{" "}
          <span className="text-secondary">Compre agora</span> e descubra o
          conforto!
        </h2>
        <p className="my-5 max-w-[33rem]">
          Qualidade e estilo para noites perfeitas.
        </p>

        {/* Botões */}
        <div className="inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl">
          <div className="text-center regular-14 leading-tight pl-5">
            <h5 className="uppercase font-bold">Cupom de Desconto</h5>
            <p className="regular-14">Para novos clientes!</p>
          </div>
          <Link to={"/"} className="btn-dark rounded-xl flexCenter !py-5">
            Aproveite Agora
          </Link>
        </div>

        {/* NewCollections */}
        <div className="mt-20">
          <OfferProducts />
        </div>
      </div>
    </section>
  );
};

export default Hero;
