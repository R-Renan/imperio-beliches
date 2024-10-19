import { motion } from "framer-motion";
import { Headset, ShieldCheck, Truck } from "lucide-react";

const perks = [
  {
    name: "Entrega Rápida e Confiável",
    Icon: Truck,
    description:
      "Contamos com uma logística especializada para que sua compra seja entregue com cuidado e sem complicações, em qualquer região do Brasil.",
  },
  {
    name: "Pagamentos 100% Seguros",
    Icon: ShieldCheck,
    description:
      "Com diversas opções de pagamento, incluindo cartões de crédito, boleto e PIX, nossa plataforma garante transações criptografadas e seguras, protegendo seus dados em todas as etapas da compra.",
  },
  {
    name: "Suporte ao Cliente",
    Icon: Headset,
    description:
      "Estamos à disposição para atender suas dúvidas ou resolver qualquer problema. Nossa equipe de suporte está sempre pronta para ajudar, seja antes ou depois da compra, garantindo a melhor experiência possível.",
  },
];

const About = () => {
  return (
    <div className="max-padd-container">
      <section className="max-w-screen-lg mx-auto py-12 border-t border-gray-200">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center md:flex-shrink-0">
                <motion.div
                  className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-secondary"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{
                    scale: 0.8,
                    rotate: -360,
                    borderRadius: "100%",
                  }}
                >
                  <perk.Icon className="w-8 h-8" />
                </motion.div>
              </div>

              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-semibold text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
