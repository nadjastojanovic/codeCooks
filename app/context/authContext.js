"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      setUser(data); // data is the full user object
      setIsAuthenticated(!!data.id);
    } catch (err) {
      console.error("Auth check failed", err);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setIsAuthenticated, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
