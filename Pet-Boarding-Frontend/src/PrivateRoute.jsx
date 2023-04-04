import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.login);
  return isAuthenticated === "true" ? children : <Navigate to="/login" />;
};
