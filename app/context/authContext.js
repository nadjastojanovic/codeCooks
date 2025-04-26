import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(!!data.user);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
