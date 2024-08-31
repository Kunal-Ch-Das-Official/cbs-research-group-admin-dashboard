// Project: CBS Research Group Admin Dashboard
// Content: Context api file for private routing
// Date: 30/08/2024

import React, { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// check authentication handler
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export context
export const useAuth = () => useContext(AuthContext);