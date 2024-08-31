// Project: CBS Research Group Admin Dashboard
// Content: Main Sidebar component
// Date: 30/08/2024
import { useCallback, useRef, useEffect, useState } from "react";
import FullMenu from "../full-menu/FullMenu";
import HalfMenu from "../half-menu/HalfMenu";
import ToggleMenu from "../toggle-menu/ToggleMenu";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../../../../authentication/auth-context/AuthContext";
import ConfirmModel from "../../../../utils/confirm-model/ConfirmModel";
import { FiLogOut } from "react-icons/fi";
const Sidebar = () => {
  const { logout } = useAuth();
  const sidebarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState();
  const [wantToLogout, setWantToLogout] = useState(false);

  const handleConfirmLogout = () => setWantToLogout(true);
  const handleLogout = () => {
    if (localStorage.getItem("auth-token")) {
      localStorage.removeItem("auth-token");
    }
    if (localStorage.getItem("admin-token")) {
      localStorage.removeItem("admin-token");
    }
    logout();
  };
  useEffect(() => {
    AOS.init();
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 767) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    handleResize(); // Initialize screen width

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Add event listener when the sidebar is open
  useEffect(() => {
    if (isMenuOpen || isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isSidebarOpen]);

  const opemHalfMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsSidebarOpen(false);
  }, []);

  const openFullMenu = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if (screenWidth > 767) {
        isSidebarOpen === true && setIsSidebarOpen(false);
      } else {
        setIsMenuOpen(true);
        setIsSidebarOpen(false);
      }
    }
  };
  return (
    <>
      {wantToLogout === true && (
        <ConfirmModel
          showOrHide={wantToLogout === true ? "flex" : "hidden"}
          confirmHandler={handleLogout}
          cancelHandler={() => setWantToLogout(false)}
          statusIcon={<FiLogOut className="text-4xl text-red-500 font-bold" />}
          confirmHandlerColor={"bg-red-500"}
          cancelHandlerColor={"bg-white"}
          alertHead={"Logout Confirmation!"}
        />
      )}
      <main ref={sidebarRef}>
        {isMenuOpen === true ? (
          <ToggleMenu openMenu={opemHalfMenu} />
        ) : (
          <HalfMenu
            openFullMenu={openFullMenu}
            closeFullmenu={() => setIsMenuOpen(true)}
            logoutHandler={handleConfirmLogout}
          />
        )}

        {isSidebarOpen === true && (
          <FullMenu
            closeFullMenu={closeSidebar}
            logoutHandler={handleConfirmLogout}
          />
        )}
      </main>
    </>
  );
};

export default Sidebar;
