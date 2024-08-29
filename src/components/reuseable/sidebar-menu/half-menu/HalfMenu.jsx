import { MdDashboard } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { BiSolidContact } from "react-icons/bi";
import { SlChemistry } from "react-icons/sl";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { FaAward } from "react-icons/fa6";
import { TbMilitaryAward } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiGroup3Fill } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";
import { MdPublishedWithChanges } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const HalfMenu = ({ openFullMenu, closeFullmenu }) => {
  return (
    <div>
      <nav
        data-aos="fade-right"
        className="bg-white h-screen fixed top-0 left-0 min-w-[15px] 
       pb-6 font-[sans-serif] border-r-[1px] border-gray-300 
"
      >
        <ul className="space-y-1">
          <li className="relative group" id="close_menu">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3"
            >
              <IoIosArrowBack
                className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125"
                onClick={closeFullmenu}
              />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Close
            </div>
          </li>

          <li className="relative group cursor-pointer" id="open_sidebar">
            <p className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 ">
              <IoIosArrowForward
                className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125"
                onClick={openFullMenu}
              />
            </p>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Open Sidebar
            </div>
          </li>
        </ul>

        <ul className="space-y-1.5 mt-5">
          {/* DASHBOARD  */}
          <li className="relative group" id="dashboard">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3"
            >
              <MdDashboard className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Dashboard
            </div>
          </li>
          {/* ADMIN OPERATIONS  */}
          <li className="relative group" id="admin_operations">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <MdAdminPanelSettings className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Admin Operations
            </div>
          </li>

          {/* ADMIN REQUEST  */}
          <li className="relative group" id="admin_request">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <VscGitPullRequestGoToChanges className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Admin Request
            </div>
          </li>

          {/* MASTERS ALUMNI  */}
          <li className="relative group" id="msc_alumni">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <PiStudentFill className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Masters Alumni
            </div>
          </li>

          {/* DOCTORATE ALUMNI  */}
          <li className="relative group" id="phd_alumni">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <FaUserDoctor className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Doctorate Alumni
            </div>
          </li>

          {/* MSC MEMBERS  */}
          <li className="relative group" id="msc_member">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <RiGroup3Fill className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              MSC Members
            </div>
          </li>

          {/* PHD MEMBERS  */}
          <li className="relative group" id="phd_member">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3"
            >
              <HiUserGroup className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              PHD Members
            </div>
          </li>

          {/* PERSONAL AWARDS  */}
          <li className="relative group" id="personal_awards">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3"
            >
              <FaAward className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Personal Awards
            </div>
          </li>

          {/* TEAM AWARDS */}
          <li className="relative group" id="team_awards">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3"
            >
              <TbMilitaryAward className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Team Awards
            </div>
          </li>

          {/* LAB INSTRUMENTS  */}
          <li className="relative group" id="lab_instruments">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <SlChemistry className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Lab Instruments
            </div>
          </li>

          {/* GROUP NEWS  */}
          <li className="relative group" id="group_news">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3"
            >
              <PiNewspaperClippingFill className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Group News
            </div>
          </li>

          {/* CONTACT US */}
          <li className="relative group" id="contact_us">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <BiSolidContact className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Contact Us
            </div>
          </li>

          {/* PROJECTS  */}
          <li className="relative group" id="projects">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3"
            >
              <GoProjectSymlink className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Projects
            </div>
          </li>

          {/* PUBLICATIONS  */}
          <li className="relative group" id="publications">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center hover:bg-white rounded px-4 py-3 "
            >
              <MdPublishedWithChanges className="text-xl text-gray-700 mx-auto inline transition-transform hover:scale-125" />
            </a>
            <div className="absolute shadow-lg hidden group-hover:block bg-white text-black font-semibold px-3 py-[6px] text-[13px] right-0 left-24 w-max top-3 rounded">
              Publications
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HalfMenu;
