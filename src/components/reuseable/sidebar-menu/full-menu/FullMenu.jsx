import { MdDashboard } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
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
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
const FullMenu = ({ closeFullMenu }) => {
  const [adminOperationDropdown, setAdminOperationDropdown] = useState(false);
  const [adminRequestDropdown, setAdminRequestDropdown] = useState(false);
  const [masterAlumniDropdown, setMasterAlumniDropdown] = useState(false);
  const [doctorateAlumniDropdown, setDoctorateAlumniDropdown] = useState(false);
  const [mscMemberDropdown, setMscMemberDropdown] = useState(false);
  const [phdMemberDropdown, setPhdMemberDropdown] = useState(false);
  const [personalAwardsDropdown, setPersonalAwardsDropdown] = useState(false);
  const [teamAwardsDropdown, setTeamAwardsDropdown] = useState(false);
  const [labInstrumentsDropdown, setLabInstrumentsDropdown] = useState(false);
  const [groupNewsDropdown, setGroupNewsDropdown] = useState(false);
  const [contactUsDropdown, setContactUsDropdown] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [publicationsDropdown, setPublicationssDropdown] = useState(false);
  const handleDropdown = (id) => {
    if (id === 1) {
      setAdminOperationDropdown((prev) => !prev);
    }
    if (id === 2) {
      setAdminRequestDropdown((prev) => !prev);
    }
    if (id === 3) {
      setMasterAlumniDropdown((prev) => !prev);
    }
    if (id === 4) {
      setDoctorateAlumniDropdown((prev) => !prev);
    }
    if (id === 5) {
      setMscMemberDropdown((prev) => !prev);
    }
    if (id === 6) {
      setPhdMemberDropdown((prev) => !prev);
    }
    if (id === 7) {
      setPersonalAwardsDropdown((prev) => !prev);
    }
    if (id === 8) {
      setTeamAwardsDropdown((prev) => !prev);
    }
    if (id === 9) {
      setLabInstrumentsDropdown((prev) => !prev);
    }
    if (id === 10) {
      setGroupNewsDropdown((prev) => !prev);
    }
    if (id === 11) {
      setContactUsDropdown((prev) => !prev);
    }
    if (id === 12) {
      setProjectsDropdown((prev) => !prev);
    }
    if (id === 13) {
      setPublicationssDropdown((prev) => !prev);
    }
  };
  return (
    <div>
      <nav
        className="bg-gray-100 h-screen fixed top-0 left-0 min-w-[260px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto no-scrollbar"
        data-aos="fade-right"
      >
        <div className="flex justify-end cursor-pointer">
          <IoCloseCircleOutline
            className="text-3xl hover:bg-black hover:text-white rounded-full"
            onClick={closeFullMenu}
          />
        </div>

        {/* LOGGED IN ADMIN SECTION  */}
        <div className="flex flex-wrap flex-col justify-center items-center cursor-pointer">
          <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-gray-900 text-xl">
            <span>S</span>
          </div>
          <div className="text-center mt-4">
            <p className="text-base text-black">John Doe</p>
            <p className="text-xs text-gray-900 mt-0.5">johndoe23@gmail.com</p>
          </div>
        </div>

        <hr className="mt-4 border-gray-900" />

        {/* DASHBOARD  */}
        <ul className="space-y-3 mt-2" id="dashboard">
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center
               hover:bg-white rounded px-4 py-3 transition-all"
            >
              <MdDashboard className="text-xl text-gray-700 mr-5" />
              <span>Dashboard</span>
            </a>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* ADMIN SECTION  */}
        <ul className="space-y-3" id="admin_section">
          {/* ADMIN OPERATIONS  */}
          <li onClick={() => handleDropdown(1)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="register_admin"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                Admin Registration
              </a>
              <a
                id="password_change"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Change Password
              </a>
            </div>
          </li>
          {/* ADMIN REQUEST  */}
          <li onClick={() => handleDropdown(2)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
              <VscGitPullRequestGoToChanges className="text-xl text-gray-700 mr-4" />
              <span className="mr-4">Admin Request</span>
              {adminRequestDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>

            <div
              onClick={closeFullMenu}
              id="admin_operation_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                adminRequestDropdown === true ? "block" : "hidden"
              }`}
            >
              <a
                id="see_admin_request"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Admin Request
              </a>
              <a
                id="send_request_accept_mail"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Send Accept Mail
              </a>
              <a
                id="send_request_reject_mail"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Send Reject Mail
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* ALUMNI SECTION  */}
        <ul className="space-y-3" id="alumni_section">
          {/* MASTERS ALUMNI  */}
          <li onClick={() => handleDropdown(3)} className="cursor-pointer">
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all"
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
              <a
                id="see_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Masters Alumni
              </a>
              <a
                id="upload_new_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Masters Alumni
              </a>
              <a
                id="edit_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Masters Alumni
              </a>

              <a
                id="delete_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Masters Alumni
              </a>
            </div>
          </li>
          {/* DOCTORATE ALUMNI  */}
          <li onClick={() => handleDropdown(4)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Doctorate Alumni
              </a>
              <a
                id="upload_new_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Doctorate Alumni
              </a>
              <a
                id="edit_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Doctorate Alumni
              </a>

              <a
                id="delete_master_alumni"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Doctorate Alumni
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* MEMBERS SECTION  */}
        <ul className="space-y-3" id="member_section">
          {/* MSC MEMBERS  */}
          <li onClick={() => handleDropdown(5)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_msc_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See MSC Members
              </a>
              <a
                id="upload_new_msc_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload MSC Member
              </a>
              <a
                id="edit_msc_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit MSC Member
              </a>

              <a
                id="delete_msc_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete MSC Member
              </a>
            </div>
          </li>
          {/* PHD MEMBERS  */}
          <li onClick={() => handleDropdown(6)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_phd_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See PHD Members
              </a>
              <a
                id="upload_new_phd_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload PHD Member
              </a>
              <a
                id="edit_phd_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit PHD Member
              </a>

              <a
                id="delete_phd_members"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete PHd Member
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* AWARDS SECTION  */}
        <ul className="space-y-3" id="awards_section">
          {/* PERSONAL AWARDS  */}
          <li onClick={() => handleDropdown(7)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_personal_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Personal Awards
              </a>
              <a
                id="upload_new_personal_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Personal Award
              </a>
              <a
                id="edit_personal_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Personal Award
              </a>

              <a
                id="delete_personal_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Personal Award
              </a>
            </div>
          </li>
          {/* TEAM AWARDS  */}
          <li onClick={() => handleDropdown(8)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_team_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Team Awards
              </a>
              <a
                id="upload_new_team_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Team Award
              </a>
              <a
                id="edit_team_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Team Award
              </a>

              <a
                id="delete_team_awards"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Team Award
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* LAB INSTRUMENTS SECTION  */}
        <ul className="space-y-3" id="lab_instruments_section">
          <li onClick={() => handleDropdown(9)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_lab_instruments"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Lab Instruments
              </a>
              <a
                id="upload_new_lab_instrument"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Lab Instrument
              </a>
              <a
                id="edit_lab_instrument"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Lab Instrument
              </a>

              <a
                id="delete_lab_instrument"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Lab Instrument
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* GROUP NEWS SECTION  */}
        <ul className="space-y-3" id="group_news_section">
          <li onClick={() => handleDropdown(10)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_group_news"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Group News
              </a>
              <a
                id="upload_new_group_news"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Group News
              </a>
              <a
                id="edit_group_news"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Group News
              </a>

              <a
                id="delete_group_news"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Group News
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* CONTACT US SECTIONS  */}
        <ul className="space-y-3" id="contact_us_section">
          <li onClick={() => handleDropdown(11)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
              <BiSolidContact className="text-xl text-gray-700 mr-4" />
              <span className="mr-10">Contact Us</span>
              {contactUsDropdown === true ? (
                <IoIosArrowUp className="text-xl text-gray-700 ml-4" />
              ) : (
                <IoIosArrowDown className="text-xl text-gray-700 ml-4" />
              )}
            </p>
            <div
              onClick={closeFullMenu}
              id="contact_us_dropdown"
              className={`bg-white border-[1px] border-gray-200 ${
                contactUsDropdown === true ? "block" : "hidden"
              }`}
            >
              <a
                id="see_contact_person"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Contact Messages
              </a>
              <a
                id="send_response"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Send Response
              </a>

              <a
                id="delete_contact_message"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Contact Message
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* PROJECTS SECTION  */}
        <ul className="space-y-3" id="projects_section">
          <li onClick={() => handleDropdown(12)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_projects"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Projects
              </a>
              <a
                id="upload_new_project"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Project
              </a>
              <a
                id="edit_project"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Project
              </a>

              <a
                id="delete_project"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Project
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* PUBLICATION SECTIONS */}
        <ul className="space-y-3" id="publications_section">
          <li onClick={() => handleDropdown(13)} className="cursor-pointer">
            <p className="text-gray-700 hover:text-black text-sm flex justify-between items-center hover:bg-white rounded px-4 py-3 transition-all">
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
              <a
                id="see_publications"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white  
                px-4 py-3 transition-all border-b-[1px] border-gray-400 hover:font-bold"
              >
                See Publications
              </a>
              <a
                id="upload_new_publication"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold border-b-[1px] border-gray-400
                px-4 py-3 transition-all"
              >
                Upload Publication
              </a>
              <a
                id="edit_publication"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 border-b-[1px] border-gray-400"
              >
                Edit Publication
              </a>

              <a
                id="delete_publication"
                href="#"
                className="text-gray-700 hover:text-black text-sm 
                flex justify-center items-center hover:bg-white hover:font-bold 
                px-4 py-3 transition-all"
              >
                Delete Publication
              </a>
            </div>
          </li>
        </ul>
        <hr className="my-2 border-gray-900" />

        {/* LOGOUT SECTIONS  */}
        <ul className="space-y-3 mt-2" id="logout">
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-black text-sm flex items-center
               hover:bg-white rounded px-4 py-3 transition-all"
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

export default FullMenu;