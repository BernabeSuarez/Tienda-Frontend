import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/useAuth";

function ProtectedRoute() {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
