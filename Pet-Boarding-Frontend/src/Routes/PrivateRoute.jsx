import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, children }) => {
  console.log(isAuthenticated, children);
  return isAuthenticated === "true" ? children : <Navigate to="/login" />;
};
