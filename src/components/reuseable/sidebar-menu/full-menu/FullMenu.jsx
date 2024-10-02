// Project: CBS Research Group Admin Dashboard
// Content: Full side bar
// Date: 30/08/2024
import PropTypes from "prop-types";
import { MdDashboard } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
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
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import GetCurrentAdmin from "../../../single-use/get-current-loggedin-admin/GetCurrentAdmin";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";
const FullMenu = ({ closeFullMenu, logoutHandler }) => {
  const [adminOperationDropdown, setAdminOperationDropdown] = useState(false);
  const [masterAlumniDropdown, setMasterAlumniDropdown] = useState(false);
  const [doctorateAlumniDropdown, setDoctorateAlumniDropdown] = useState(false);
  const [mscMemberDropdown, setMscMemberDropdown] = useState(false);
  const [phdMemberDropdown, setPhdMemberDropdown] = useState(false);
  const [personalAwardsDropdown, setPersonalAwardsDropdown] = useState(false);
  const [teamAwardsDropdown, setTeamAwardsDropdown] = useState(false);
  const [labInstrumentsDropdown, setLabInstrumentsDropdown] = useState(false);
  const [groupNewsDropdown, setGroupNewsDropdown] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [publicationsDropdown, setPublicationssDropdown] = useState(false);
  const handleDropdown = (id) => {
    if (id === 1) {
      setAdminOperationDropdown((prev) => !prev);
    }
    if (id === 2) {
      setMasterAlumniDropdown((prev) => !prev);
    }
    if (id === 3) {
      setDoctorateAlumniDropdown((prev) => !prev);
    }
    if (id === 4) {
      setMscMemberDropdown((prev) => !prev);
    }
    if (id === 5) {
      setPhdMemberDropdown((prev) => !prev);
    }
    if (id === 6) {
      setPersonalAwardsDropdown((prev) => !prev);
    }
    if (id === 7) {
      setTeamAwardsDropdown((prev) => !prev);
    }
    if (id === 8) {
      setLabInstrumentsDropdown((prev) => !prev);
    }
    if (id === 9) {
      setGroupNewsDropdown((prev) => !prev);
    }
    if (id === 11) {
      setProjectsDropdown((prev) => !prev);
    }
    if (id === 12) {
      setPublicationssDropdown((prev) => !prev);
    }
  };
  return (
    <div>
      <nav
        className="bg-white h-screen fixed top-0 left-0 min-w-[260px] py-6 px-4 font-[sans-serif] opacity-100 z-[100000]
         flex flex-col overflow-auto no-scrollbar shadow-xl"
        data-aos="fade-right"
      >
        <div className="flex justify-end cursor-pointer">
          <MdCancelPresentation
            className="text-3xl text-gray-700 transform translate-1 hover:scale-110 hover:text-black"
            onClick={closeFullMenu}
          />
        </div>

        {/* LOGGED IN ADMIN SECTION  */}
        <GetCurrentAdmin />

        <hr className="mt-4 border-gray-900" />

        {/* DASHBOARD  */}
        <ul className="space-y-3 mt-2" id="dashboard" onClick={closeFullMenu}>
          <li>
            <Link
              to={"/admin-panel"}
              className="text-gray-700 hover:text-black text-sm flex items-center justify-between
               hover:bg-gray-300  rounded px-4 py-3 transition-all"
            >
              <MdDashboard className="text-xl text-gray-700" />
              <span className="mr-12">Dashboard</span>
              <IoIosArrowForward className="text-lg" />
            </Link>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* ADMIN SECTION  */}
        <ul className="space-y-3" id="admin_section">
          {/* ADMIN OPERATIONS  */}
          <li onClick={() => handleDropdown(1)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <MdAdminPanelSettings className="text-xl text-gray-700 mr-4" />
              <span className="">Admin Operations</span>
              {adminOperationDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="admin_operation_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                adminOperationDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/register"}
                id="register_admin"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Admin Registration
              </Link>
              <Link
                to={"/admin-panel/password-change"}
                id="password_change"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold 
                px-4 py-3 transition-all"
              >
                Change Password
              </Link>

              <Link
                to={"/admin-panel/manage-admin-accounts"}
                id="password_change"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center border-t-[1px] border-gray-400 hover:bg-gray-300  hover:font-bold 
                px-4 py-3 transition-all"
              >
                Manage Account
              </Link>
            </div>
          </li>
          {/* ADMIN REQUEST  */}
          <li onClick={closeFullMenu}>
            <Link to={"/admin-panel/manage-request"} className="cursor-pointer">
              <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
                <VscGitPullRequestGoToChanges className="text-xl text-gray-700" />
                <span>Manage Requests</span>
                <IoIosArrowForward className="text-lg" />
              </p>
            </Link>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* ALUMNI SECTION  */}
        <ul className="space-y-3" id="alumni_section">
          {/* MASTERS ALUMNI  */}
          <li onClick={() => handleDropdown(2)} className="cursor-pointer">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all"
            >
              <PiStudentFill className="text-xl text-gray-700" />
              <span className="">Masters Alumni</span>
              {masterAlumniDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </a>

            <div
              onClick={closeFullMenu}
              id="masters_alumni_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                masterAlumniDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-masters-alumni"}
                id="see_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-masters-alumni"}
                id="upload_new_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
          {/* DOCTORATE ALUMNI  */}
          <li onClick={() => handleDropdown(3)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <FaUserDoctor className="text-xl text-gray-700 mr-4" />
              <span className="mr-1">Doctotate Alumni</span>
              {doctorateAlumniDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>

            <div
              onClick={closeFullMenu}
              id="doctorate_alumni_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                doctorateAlumniDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-doctorate-alumni"}
                id="manage_master_alumni"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Manage Data
              </Link>

              <Link
                to={"/admin-panel/upload-doctorate-alumni"}
                id="upload_master_alumni"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold 
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* MEMBERS SECTION  */}
        <ul className="space-y-3" id="member_section">
          {/* MSC MEMBERS  */}
          <li onClick={() => handleDropdown(4)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <RiGroup3Fill className="text-xl text-gray-700" />
              <span className="mr-1">MSC Members</span>
              {mscMemberDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="msc_members_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                mscMemberDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-msc-members"}
                id="manage_msc_members"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold 
                px-4 py-3 transition-all"
              >
                Manage Data
              </Link>
              <hr className=" border-gray-500" />
              <Link
                to={"/admin-panel/upload-msc-member"}
                id="upload_new_msc_members"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold 
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
          {/* PHD MEMBERS  */}
          <li onClick={() => handleDropdown(5)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <HiUserGroup className="text-xl text-gray-700 mr-4" />
              <span className="mr-4">PHD Members</span>
              {phdMemberDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>

            <div
              onClick={closeFullMenu}
              id="phd_members_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                phdMemberDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-phd-members"}
                id="manage_phd_members"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-phd-member"}
                id="upload_new_phd_members"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* AWARDS SECTION  */}
        <ul className="space-y-3" id="awards_section">
          {/* PERSONAL AWARDS  */}
          <li onClick={() => handleDropdown(6)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <FaAward className="text-xl text-gray-700" />
              <span className="ml-2">Personal Awards</span>
              {personalAwardsDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="personal_awards_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                personalAwardsDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-personal-awards"}
                id="manage_personal_awards"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-personal-award"}
                id="upload_new_personal_awards"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
          {/* TEAM AWARDS  */}
          <li onClick={() => handleDropdown(7)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <TbMilitaryAward className="text-xl text-gray-700 mr-4" />
              <span className="mr-8">Team Awards</span>
              {teamAwardsDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="team_awards_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                teamAwardsDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-team-awards"}
                id="manage_team_awards"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-team-award"}
                id="upload_new_team_awards"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold 
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* LAB INSTRUMENTS SECTION  */}
        <ul className="space-y-3" id="lab_instruments_section">
          <li onClick={() => handleDropdown(8)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <SlChemistry className="text-xl text-gray-700 mr-4" />
              <span className="mr-2">Lab Instruments</span>
              {labInstrumentsDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="lab_instruments_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                labInstrumentsDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-lab-instruments"}
                id="manage_lab_instruments"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-lab-instrument"}
                id="upload_new_lab_instrument"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* GROUP NEWS SECTION  */}
        <ul className="space-y-3" id="group_news_section">
          <li onClick={() => handleDropdown(9)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <PiNewspaperClippingFill className="text-xl text-gray-700 mr-4" />
              <span className="mr-8">Group News</span>
              {groupNewsDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="group_news_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                groupNewsDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-group-news"}
                id="manage_group_news"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-group-news"}
                id="upload_new_group_news"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* CONTACT US SECTIONS  */}
        <ul
          className="space-y-3 mt-2"
          id="contact_manage"
          onClick={closeFullMenu}
        >
          <li>
            <Link
              to={"/admin-panel/manage-contacts"}
              className="text-gray-700 hover:text-black text-sm flex items-center justify-between
               hover:bg-gray-300  rounded px-4 py-3 transition-all"
            >
              <MdDashboard className="text-xl text-gray-700" />
              <span className="">Manage Contacts</span>
              <IoIosArrowForward className="text-lg" />
            </Link>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* PROJECTS SECTION  */}
        <ul className="space-y-3" id="projects_section">
          <li onClick={() => handleDropdown(11)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <GoProjectSymlink className="text-xl text-gray-700 mr-4" />
              <span className="mr-14">Projects</span>
              {projectsDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="projects_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                projectsDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-projects"}
                id="manage_projects"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-project"}
                id="upload_new_project"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* PUBLICATION SECTIONS */}
        <ul className="space-y-3" id="publications_section">
          <li onClick={() => handleDropdown(12)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-gray-300  rounded px-4 py-3 transition-all">
              <MdPublishedWithChanges className="text-xl text-gray-700 mr-4" />
              <span className="mr-8">Publications</span>
              {publicationsDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>

            <div
              onClick={closeFullMenu}
              id="publications_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                publicationsDropdown === true ? "block" : "hidden"
              }`}
            >
              <Link
                to={"/admin-panel/manage-publications"}
                id="manage_publications"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300   
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Manage Data
              </Link>
              <Link
                to={"/admin-panel/upload-publication"}
                id="upload_new_publication"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-gray-300  hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Data
              </Link>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* LOGOUT SECTIONS  */}
        <ul className="space-y-3 mt-2" id="logout" onClick={logoutHandler}>
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center
               hover:bg-gray-300  rounded px-4 py-3 transition-all"
            >
              <RiLogoutBoxLine className="text-xl text-gray-700 mr-5" />
              <span className="ml-1">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
FullMenu.propTypes = {
  closeFullMenu: PropTypes.func,
  logoutHandler: PropTypes.func,
};

export default FullMenu;
