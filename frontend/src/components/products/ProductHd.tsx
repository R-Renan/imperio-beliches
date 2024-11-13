import { ChevronRight } from "lucide-react";
import { Product } from "../../lib/types";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const ProductHd = (props: Product) => {
  const { name, category_name } = props;

  const HDItems = [
    { to: "/", label: "Todos os Produtos" },
    {
      to:
        category_name === "Colchões"
          ? "/colchoes"
          : category_name === "Beliches"
          ? "/beliches"
          : "/category",
      label: category_name,
    },
  ];

  return (
    <div className="max-padd-container flex items-center flex-wrap gap-x-1 py-1">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "active-link" : "text-tertiary"
        }
      >
        <Button variant="link" className="text-tertiary p-0 m-0 min-w-0">
          Página Inicial
        </Button>
      </NavLink>
      <span className="px-1">|</span>
      {HDItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? "active-link" : "text-tertiary"
          }
        >
          <Button variant="link" className="text-tertiary p-0 m-0 min-w-0">
            {item.label} <ChevronRight />
          </Button>
        </NavLink>
      ))}
      <Button variant="link" className="text-tertiary p-0 m-0 min-w-0">
        {name}
      </Button>
    </div>
  );
};

export default ProductHd;
