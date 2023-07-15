import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import Cookies from "js-cookie";

function ProtectedRoute() {
  const cookies = Cookies.get("TOKEN");

  const { isAuth } = useAuth();

  if (!cookies && !isAuth) return <Navigate to="/login" />;
  return <Outlet />;
}

export default ProtectedRoute;
