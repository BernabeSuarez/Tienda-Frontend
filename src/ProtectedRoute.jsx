import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/useAuth";

function ProtectedRoute() {
  const { loading, isAuth } = useAuth();
  console.log(loading, isAuth);

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuth) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
