import PopularProducts from "./PopularProducts";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { TextEffect } from "../ui/core/text-effect";
import { useEffect, useState } from "react";

const Offer = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [roundedValue, setRoundedValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, 20, { duration: 3 });
    return () => controls.stop();
  }, [count]);

  useMotionValueEvent(rounded, "change", (latest) => {
    setRoundedValue(latest);
  });

  return (
    <section className="max-padd-container relative w-full mb-24 cursor-default">
      <div className="absolute top-0 left-0 w-full h-[620px] bg-banneroffer bg-cover bg-center bg-no-repeat z-[-1]" />
      <div className="relative top-24 xs:top-32 w-full h-auto">
        <TextEffect
          className="uppercase medium-18 tracking-wider "
          as="h4"
          per="char"
          preset="fade"
        >
          Black Friday Saldão!
        </TextEffect>
        <motion.h2
          className="h1 max-w-[40rem] "
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 0.9 }}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
        >
          Aproveite até{" "}
          <motion.span className="text-secondary bg-[#FDF660] rounded-full text-[2.75rem] px-2 py-1">
            {roundedValue}% OFF
          </motion.span>{" "}
          em colchões!
        </motion.h2>

        {/* Em Promoção */}
        <div className="mt-40 mb-40">
          <PopularProducts />
        </div>
      </div>
    </section>
  );
};

export default Offer;
