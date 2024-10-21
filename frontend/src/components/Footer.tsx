import NavFooter from "./NavFooter";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="py-2">
      <div className="flexCenter flex-col bg-white gap-y-4">
        <div className="flex items-center py-4 px-4">
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
