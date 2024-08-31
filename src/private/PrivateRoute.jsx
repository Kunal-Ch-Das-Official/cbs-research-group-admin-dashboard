// Project: CBS Research Group Admin Dashboard
// Content: Private router for check authenticity
// Date: 30/08/2024

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authentication/auth-context/AuthContext";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
