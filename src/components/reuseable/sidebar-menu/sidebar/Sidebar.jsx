import { useCallback, useEffect, useState } from "react";
import FullMenu from "../full-menu/FullMenu";
import HalfMenu from "../half-menu/HalfMenu";
import ToggleMenu from "../toggle-menu/ToggleMenu";
import AOS from "aos";
import "aos/dist/aos.css";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState();
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
  return (
    <main>
      {isMenuOpen === true ? (
        <ToggleMenu openMenu={opemHalfMenu} />
      ) : (
        <HalfMenu
          openFullMenu={openFullMenu}
          closeFullmenu={() => setIsMenuOpen(true)}
        />
      )}

      {isSidebarOpen === true && <FullMenu closeFullMenu={closeSidebar} />}
    </main>
  );
};

export default Sidebar;
