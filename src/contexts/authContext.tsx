import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

interface IAuthContext {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || null;
  });

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);

    api.defaults.headers.common.Authorization = `Bearer ${token}`
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },[token])

  const contextValue = useMemo(
    () => ({
      token,
      login,
      logout,
      isAuthenticated,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;