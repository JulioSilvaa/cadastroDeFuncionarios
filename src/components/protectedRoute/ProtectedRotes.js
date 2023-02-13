import { useAuthentication } from "hooks/useAuthentication";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { auth } = useAuthentication();

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
