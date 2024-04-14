import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRoute {
  token: string | null | undefined;
  redirectPath?: string;
  children?: ReactNode[] | undefined;
}

const ProtectedRoute = ({
  token,
  redirectPath = "/login",
}: IProtectedRoute) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
