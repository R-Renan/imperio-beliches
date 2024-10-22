import { Link } from "react-router-dom";
import logo from "../assets/logo-large.png";
import Navbar from "./Navbar";
import { UserRound, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Cart from "./cart/Cart";

interface HeaderProps {
  user: { name: string } | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Header = ({ user, onLogin, onLogout }: HeaderProps) => {
  return (
    <header className="w-full z-50 bg-white">
      <div className="px-5 flexBetween py-3 shadow-md">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-x-2">
          <img
            src={logo}
            alt="LogoImage"
            className="transition-transform duration-300 hover:scale-105"
            width={130}
          />
        </Link>

        {/* Navbar */}
        <div className="flexCenter gap-x-4">
          <Navbar
            containerStyles={
              "hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1"
            }
          />

          {/* Botões de Carrinho e Autenticação */}
          <div className="flexBetween gap-x-5 bold-16">
            {/* <NavLink to={"/carrinho"} className={"flex items-center"}> */}
            <Cart />
            {/* </NavLink> */}

            {/* Verifica se o usuário está logado */}
            {user ? (
              <div className="flex items-center gap-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <Avatar>
                        <AvatarImage
                          src="https://via.placeholder.com/40"
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="ml-2">Olá, {user.name}</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <button
                  onClick={onLogin}
                  className="btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"
                >
                  <UserRound height={19} width={19} />
                  Login
                </button>
                <Link
                  to="/signup"
                  className="text-xs mt-3 text-gray-500 hover:active-link hover:text-gray-500"
                >
                  Não tem uma conta? Crie uma agora
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
