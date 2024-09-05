import { Outlet } from "react-router-dom";
import Sidebar from "./components/reuseable/sidebar-menu/sidebar/Sidebar";
import Footer from "./components/reuseable/footer/Footer";

const AdminPanel = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminPanel;
