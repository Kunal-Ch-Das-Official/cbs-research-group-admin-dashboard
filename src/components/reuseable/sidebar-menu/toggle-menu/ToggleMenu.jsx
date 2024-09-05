import { BiMenuAltLeft } from "react-icons/bi";
import comapnyLogo from "../../../../assets/CBS Research Group Logo.png";
import PropTypes from "prop-types";
const ToggleMenu = ({ openMenu }) => {
  return (
    <div
      className={`pt-2 pl-2 fixed top-0 left-0 inline-flex bg-white z-[1000] items-center justify-between pr-10 border-b-[1px] border-gray-200 pb-2 w-full`}
    >
      <div className=" inline-flex items-center ">
        <BiMenuAltLeft
          className="text-5xl font-bold text-gray-700 hover:text-black cursor-pointer transition-transform hover:scale-125 "
          onClick={openMenu}
        />
      </div>
      <div>
        <img
          src={comapnyLogo}
          alt="CBS-Research-Group-Logo"
          className="h-[40px] w-[80px]"
        />
      </div>
    </div>
  );
};

ToggleMenu.propTypes = {
  openMenu: PropTypes.func,
};
export default ToggleMenu;
