import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";

const Header = () => {
  const [menuOpned, setmenuOpened] = useState(false);
  const toggleMenu = () => setmenuOpened(!menuOpned);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setmenuOpened(false);
      }
    };

    const handleResize = () => {
      setmenuOpened(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpned]);

  return (
    <header className="max-padd-container w-full z-50">
      <div className="flexBetween py-3">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-x-2">
          <img src={logo} alt="LogoImage" height={31} width={31} />
          <span className="bold-24 hidden xs:flex ">Império Beliches</span>
        </Link>
        {/* Navbar & Button */}
        <div className="flexCenter gap-x-4">
          {/* Destktop Navbar */}
          <div>
            <Navbar
              containerStyles={
                "hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1"
              }
            />
          </div>
          {/* Mobile Navbar */}
          <div>
            <Navbar
              containerStyles={`${
                menuOpned
                  ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
                  : "flex items-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50 -right-[100%]"
              }`}
            />
          </div>
          {/* Buttons */}
          <div className="flexBetween gap-x-3 sm:gap-x-2 bold-16">
            {!menuOpned ? (
              <Menu
                className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                onClick={toggleMenu}
              />
            ) : (
              <X
                className="xl:hidden cursor-pointer text-3xl hover:text-secondary"
                onClick={toggleMenu}
              />
            )}
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
                <User height={19} width={19} />
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
