import { ArrowRight } from "lucide-react";

import { Product } from "../../lib/types";

const ProductHd = (props: Product) => {
  const { name, category_name } = props;

  return (
    <div className="max-padd-container flex items-center flex-wrap gap-x-2 medium-16 py-4 capitalize bg-primary">
      Home <ArrowRight /> Shop <ArrowRight /> {category_name}
      <ArrowRight /> {name}
    </div>
  );
};

export default ProductHd;
