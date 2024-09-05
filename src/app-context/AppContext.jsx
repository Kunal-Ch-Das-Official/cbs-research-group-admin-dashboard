// Project: CBS Research Group Admin Dashboard
// Content: Context api file for private routing
// Date: 30/08/2024

import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
// Create context
const AppContext = createContext();

// check authentication handler
export const AppProvider = ({ children }) => {
  const [isIdAccepted, setisIdAccepted] = useState(null);
  const [isIdRejected, setisIdRejected] = useState(null);

  // return context with all state and handler
  return (
    <AppContext.Provider
      value={{ isIdAccepted, setisIdAccepted, isIdRejected, setisIdRejected }}
    >
      {children}
    </AppContext.Provider>
  );
};
AppProvider.propTypes = {
  children: PropTypes.node,
};
// export context

export const useApp = () => useContext(AppContext);
