import { Link } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";

const Hero = () => {
  return (
    <section className="max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[744px] w-full">
      <div className="relative top-24 xs:top-32">
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
        {/* Buttons */}
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
        <div className="mt-16">
          <RelatedProducts />
        </div>
      </div>
    </section>
  );
};

export default Hero;
