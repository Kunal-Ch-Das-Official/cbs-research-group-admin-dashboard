// Project: CBS Research Group Admin Dashboard
// Content: Context api file for private routing
// Date: 30/08/2024

import { createContext, useState } from "react";
import PropTypes from "prop-types";
// Create context
const AuthContext = createContext();

// check authentication handler
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  // login handler
  const login = () => {
    setIsAuthenticated(true);
  };

  // logout handler
  const logout = () => {
    setIsAuthenticated(false);
  };
  // return context with all state and handler
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, modelOpen, setModelOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
