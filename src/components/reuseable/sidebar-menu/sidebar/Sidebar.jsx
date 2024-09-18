// Project: CBS Research Group Admin Dashboard
// Content: Main Sidebar component
// Date: 30/08/2024
import { useCallback, useRef, useEffect, useState } from "react";
import FullMenu from "../full-menu/FullMenu";
import ToggleMenu from "../toggle-menu/ToggleMenu";
import AOS from "aos";
import "aos/dist/aos.css";
import ConfirmModel from "../../../../utils/confirm-model/ConfirmModel";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../../authentication/auth-context/useAuth";
const Sidebar = () => {
  const { logout } = useAuth();
  const sidebarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState();
  const [wantToLogout, setWantToLogout] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const handleConfirmLogout = () => setWantToLogout(true);
  const handleLogout = () => {
    if (localStorage.getItem("auth-token")) {
      localStorage.removeItem("auth-token");
    }
    if (localStorage.getItem("expires")) {
      localStorage.removeItem("expires");
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

  const handleClickOutside = useCallback(
    (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (screenWidth > 767) {
          isMenuOpen === false && setIsMenuOpen(true);
        } else {
          setIsMenuOpen(true);
        }
      }
    },
    [isMenuOpen, screenWidth]
  );

  // Add event listener when the sidebar is open
  useEffect(() => {
    if (isMenuOpen === false) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  const openFullMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  const closeSidebar = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <ToggleMenu
            openMenu={openFullMenu}
            isVisable={isSticky === true ? "inline-flex" : "hidden"}
          />
        ) : (
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
