import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-large.png";
import Navbar from "./Navbar";
import { ShoppingCart, UserRound } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full z-50 bg-white">
      <div className="max-padd-container flexBetween py-3">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-x-2">
          <img src={logo} alt="LogoImage" width={120} />
        </Link>
        {/* Navbar */}
        <div className="flexCenter gap-x-4">
          <div>
            <Navbar
              containerStyles={
                "hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1"
              }
            />
          </div>

          {/* Buttons */}
          <div className="flexBetween gap-x-3 sm:gap-x-2 bold-16">
            <div className="flexBetween sm:gap-x-6">
              <NavLink to={"/"} className={"flex"}>
                <ShoppingCart className="p-2 h-10 w-10 hover:text-secondary" />
                <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2 right-3">
                  {0}
                </span>
              </NavLink>
              <NavLink
                to={"/"}
                className={
                  "btn-secondary flexCenter gap-x-2 medium-16 rounded-xl"
                }
              >
                <UserRound height={19} width={19} />
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
