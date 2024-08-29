import React from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";
import comapnyLogo from "../../../../assets/CBS Research Group Logo.png";

const ToggleMenu = ({ openMenu }) => {
  return (
    <div className="mt-2 ml-2 fixed top-0 left-0 inline-flex items-center justify-between pr-20 border-b-[1px] border-gray-200 pb-2 w-full">
      <div className=" inline-flex items-center ">
        <RiMenuUnfoldLine
          className="text-4xl font-bold text-gray-700 hover:text-black cursor-pointer transition-transform hover:scale-125 "
          onClick={openMenu}
        />
        <h1 className="ml-4 text-xl font-bold">Overview</h1>
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

export default ToggleMenu;
