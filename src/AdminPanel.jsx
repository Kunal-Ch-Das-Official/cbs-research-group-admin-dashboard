import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/reuseable/sidebar-menu/sidebar/Sidebar";

const AdminPanel = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default AdminPanel;
