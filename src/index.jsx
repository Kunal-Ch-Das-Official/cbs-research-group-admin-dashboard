/* 
Project: CBS Research Group Admin Dashboard
Content: Application direction decider
Date: 29/08/2024 
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./authentication/auth-components/admin-login/AdminLogin";
import { useAuth } from "./authentication/auth-context/useAuth.js";

const Index = () => {
  const [authAdmin, setAuthAdmin] = useState(false);
  const navigate = useNavigate();
  const { modelOpen, login } = useAuth();

  useEffect(() => {
    const handlerReload = (window.onload = () => {
      const adminToken = localStorage.getItem("admin-token") || null;
      if (adminToken) {
        localStorage.removeItem("admin-token");
      }
    });
    handlerReload();
  }, []);
  useEffect(() => {
    const now = new Date();
    const isAuth = localStorage.getItem("auth-token");
    const expires = localStorage.getItem("expires") || null;

    if (expires) {
      const getexpireItem = JSON.parse(expires);
      const getexpireDate = getexpireItem.expiry;
      if (now.getTime() > getexpireDate) {
        localStorage.removeItem(isAuth);
        localStorage.removeItem(expires);
      }
    }
    if (isAuth && modelOpen === false) {
      navigate("/admin-panel");
      login();
      setAuthAdmin(true);
    }
  }, [login, modelOpen, navigate]);
  return <>{authAdmin === false && <AdminLogin />}</>;
};

export default Index;
