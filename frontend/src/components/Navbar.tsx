import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

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
      {navItems.map((item) => (
        <NavLink
          key={item.to} // Usar `item.to` como key para melhor identificação
          to={item.to}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Button variant="outline">{item.label}</Button>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
