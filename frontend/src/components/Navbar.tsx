import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {
  containerStyles: string;
}

const Navbar = ({ containerStyles }: NavbarProps) => {
  const navItems = [
    { to: "/", label: "Página Inicial" },
    { to: "/colchoes", label: "Colchões" },
    { to: "/beliches", label: "Beliches" },
    { to: "/todos-produtos", label: "Todos os Produtos" },
  ];

  return (
    <nav className={containerStyles}>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
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
