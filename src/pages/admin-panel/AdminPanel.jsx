import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/reuseable/sidebar-menu/sidebar/Sidebar";

const AdminPanel = () => {
  return (
    <main>
      <Sidebar />
      <Outlet />
    </main>
  );
};

export default AdminPanel;
