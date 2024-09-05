// Project: CBS Research Group Admin Dashboard
// Content: Private router for check authenticity
// Date: 30/08/2024

import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";
import { useAuth } from "../authentication/auth-context/useAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // or PropTypes.node if it's not required
};

export default PrivateRoute;
