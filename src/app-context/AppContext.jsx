// AppProvider.jsx
import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create context
const AppContext = createContext();

// Define AppProvider to wrap application components
export const AppProvider = ({ children }) => {
  const [isIdAccepted, setisIdAccepted] = useState(null);
  const [isIdRejected, setisIdRejected] = useState(null);
  const [isContactResSend, setisContactResSend] = useState(null);

  // Return context with all state and handler
  return (
    <AppContext.Provider
      value={{
        isIdAccepted,
        setisIdAccepted,
        isIdRejected,
        setisIdRejected,
        isContactResSend,
        setisContactResSend,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
