import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import SearchButton from "./SearchButton";

interface NavbarProps {
  containerStyles: string;
}

const navItems = [
  { to: "/", label: "Página Inicial" },
  { to: "/colchoes", label: "Colchões" },
  { to: "/beliches", label: "Beliches" },
  { to: "/todos-produtos", label: "Todos os Produtos" },
];

const Navbar = ({ containerStyles }: NavbarProps) => {
  return (
    <nav className={containerStyles}>
      {/* Botão de Pesquisa */}
      <SearchButton />

      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? "active-link" : "text-tertiary"
          }
        >
          <Button
            variant="ghost"
            className="hover:bg-white hover:active-link transition-colors duration-300"
          >
            {" "}
            {/* Transição suave na mudança de cor */}
            {item.label}
          </Button>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
