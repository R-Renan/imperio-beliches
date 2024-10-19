import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

interface NavFooterProps {
  containerStyles: string;
}

const NavFooter = ({ containerStyles }: NavFooterProps) => {
  const links = [
    { to: "/", label: "Terms" },
    { to: "/", label: "Privacy Policy" },
    { to: "/", label: "Cookie Policy" },
  ];

  return (
    <nav className={containerStyles}>
      {links.map((link, index) => (
        <NavLink key={index} to={link.to}>
          <Button variant="link" className="text-black">
            {link.label}
          </Button>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavFooter;
