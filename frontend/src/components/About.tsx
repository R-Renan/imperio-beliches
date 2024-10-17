import { Headset, ShieldCheck, Truck } from "lucide-react";
import about from "../assets/logo-small.png";

const About = () => {
  return (
    <section className="max-padd-container py-12 xl:py-12">
      {/* container */}
      <div className="flex flex-col xl:flex-row">
        {/* left */}
        <div className="flex-1">
          <h3 className="h3">
            Descubra as principais vantagens da nossa loja!
          </h3>
          <p className="py-5 ">
            Garantia de qualidade, segurança e suporte ao cliente.
          </p>
          <div className="flex flex-col items-start gap-y-4">
            {/* Transporte */}
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <Truck className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Entrega Rápida e Confiável</h4>
                <p>
                  Contamos com uma logística especializada para que sua compra
                  seja entregue com cuidado e sem complicações, em qualquer
                  região do Brasil.
                </p>
              </div>
            </div>
            {/* Segurança */}
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <ShieldCheck className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Pagamentos 100% Seguros</h4>
                <p>
                  Com diversas opções de pagamento, incluindo cartões de
                  crédito, boleto e PIX, nossa plataforma garante transações
                  criptografadas e seguras, protegendo seus dados em todas as
                  etapas da compra.
                </p>
              </div>
            </div>
            {/* Suporte */}
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondary flexCenter rounded-md">
                <Headset className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="medium-18">Suporte ao Cliente</h4>
                <p>
                  Estamos à disposição para atender suas dúvidas ou resolver
                  qualquer problema. Nossa equipe de suporte está sempre pronta
                  para ajudar, seja antes ou depois da compra, garantindo a
                  melhor experiência possível.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 flexCenter">
          <div>
            <img src={about} alt="" height={488} width={488} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
