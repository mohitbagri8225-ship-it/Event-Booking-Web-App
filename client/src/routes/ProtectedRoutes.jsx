import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoggedIn } = useAuth();

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;