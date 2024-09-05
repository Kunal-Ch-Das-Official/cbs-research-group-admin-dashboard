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
  const { login } = useAuth();

  useEffect(() => {
    const isAuth = localStorage.getItem("auth-token");
    if (isAuth) {
      navigate("/admin-panel");
      login();
      setAuthAdmin(true);
    }
  }, [login, navigate]);
  return <>{authAdmin === false && <AdminLogin />}</>;
};

export default Index;
