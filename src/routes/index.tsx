import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../contexts/authContext";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  const auth = useAuth();

  const token = auth.token;

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path={"/"}
          index
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />

        <Route
          path={"/login"}
          element={
            auth.isAuthenticated() ? (
              <Navigate to={"/dashboard"} replace />
            ) : (
              <Login />
            )
          }
        />
        
        <Route
          path={"/register"}
          element={
            auth.isAuthenticated() ? (
              <Navigate to={"/dashboard"} replace />
            ) : (
              <Register />
            )
          }
        />

        <Route element={<ProtectedRoute token={token} />}>
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
