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
import Cart from "./products/Cart";
import Notification from "./users/Notification";
import React from "react";

interface HeaderProps {
  user: { name: string } | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout }) => {
  return (
    <header className="w-full z-50 bg-white">
      <div className="px-5 flex justify-between py-3 shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-x-2">
          <img
            src={logo}
            alt="Logo Image"
            className="transition-transform duration-300 hover:scale-105"
            width={130}
          />
        </Link>

        {/* Navbar */}
        <div className="flex items-center gap-x-4">
          <Navbar containerStyles="hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1" />

          {/* Notifications and Cart */}
          <div className="flex items-center gap-x-5">
            <Notification />
            <Cart />

            {/* User Authentication */}
            {user ? (
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
            ) : (
              <div className="flex flex-col items-center">
                <button
                  onClick={onLogin}
                  className="btn-secondary flex items-center gap-x-2 rounded-xl"
                >
                  <UserRound height={19} width={19} />
                  Login
                </button>
                <Link
                  to="/signup"
                  className="text-xs mt-3 text-gray-500 hover:underline"
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
