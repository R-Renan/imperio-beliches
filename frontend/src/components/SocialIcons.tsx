import { Link } from "react-router-dom";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="flex gap-6 pr-4">
      <Link
        to={"/"}
        className=" text-[#0866FF] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <FaFacebookSquare />
      </Link>
      <Link
        to={"/"}
        className="text-[#f6045da8] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiInstagramFill />
      </Link>
      <Link
        to={"/"}
        className="text-[#00BD07] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiWhatsappFill />
      </Link>
    </div>
  );
};

export default SocialIcons;
