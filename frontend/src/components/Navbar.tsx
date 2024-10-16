import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {
  containerStyles: string;
}

const Navbar = ({ containerStyles }: NavbarProps) => {
  return (
    <nav className={`${containerStyles}`}>
      {/* Botão para a página inicial */}
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <Button variant={"outline"}>Pagina Inicial</Button>
      </NavLink>

      {/* Botão para Colchões */}
      <NavLink
        to={"/colchoes"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <Button variant={"outline"}>Colchões</Button>
      </NavLink>

      {/* Botão para Beliches */}
      <NavLink
        to={"/beliches"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <Button variant={"outline"}>Beliches</Button>
      </NavLink>

      {/* Botão para Todos os Produtos */}
      <NavLink
        to={"/todos-produtos"}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <Button variant={"outline"}>Todos os Produtos</Button>
      </NavLink>
    </nav>
  );
};

export default Navbar;
