import { Link } from "react-router-dom";
import logo from "../assets/logo-small.png";
import NavFooter from "./NavFooter";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="py-2">
      <div className="flexCenter flex-col bg-white gap-y-4">
        {/* logo */}
        <Link to={"/"} className="flex items-center gap-x-2">
          <img src={logo} alt="LogoImage" height={100} width={100} />
        </Link>
        <div className="py-4">
          <NavFooter
            containerStyles={
              "flex gap-x-5 xl:gap-x-10 text-secondary medium-15 rounded-full px-2 py-1"
            }
          />
        </div>
        <SocialIcons />
        <hr className="h-[1px] w-2/3 my-3 bg-gray-200" />
        <div>
          Copyright &copy; {new Date().getFullYear()} Império Beliches | Todos
          os direitos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
